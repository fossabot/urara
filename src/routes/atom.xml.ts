import type { EndpointOutput } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { genPosts } from '$lib/utils/posts'

const posts = genPosts()
const render = async (): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${site.title}</title>
  ${site.subtitle ? `<subtitle>${site.subtitle}</subtitle>` : ''}
  <link href="${site.url}" />
  <link href="${site.url}/atom.xml" rel="self" />
  <updated>${new Date().toJSON()}</updated>
  <author>
    <name>${site.author.name}</name>${site.author.email ? `<email>${site.author.email}</email>` : ''}
  </author>
  <id>${site.url}/</id>
  ${Object.entries(posts)
    .flatMap(([key, value]) => (+key > 0 ? value : []))
    .map(
      post => `<entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${site.url + post.path}" />
    <id>${site.url + post.path}</id>
    <published>${new Date(post.date ??= '2021-11-01').toJSON()}</published>
    <updated>${new Date(post.lastmod ?? post.date).toJSON()}</updated>${
        post.descr ? `\n    <summary type="html"><![CDATA[${post.descr.toString()}]]></summary>` : ''
      }
    <content type="html">
      <![CDATA[${post.html}]]>
    </content>
  </entry>`
    )
    .join('\n  ')}
</feed>`

export const get = async (): Promise<EndpointOutput> => ({
  headers: {
    'Content-Type': 'application/atom+xml; charset=utf-8'
  },
  body: await render()
})
