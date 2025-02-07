import type { EndpointOutput } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { genPosts } from '$lib/utils/posts'

const posts = genPosts()
const render = async (): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${Object.entries(posts)
      .flatMap(([, posts]) =>
        posts.map(
          post => `
        <url>
            <loc>${site.url + post.path}</loc>
            <lastmod>${post.lastmod ? post.lastmod.substr(0, 10) : post.date.substr(0, 10)}</lastmod>
            <priority>${
              post.priority
                ? ((1000 - (Array.isArray(post.priority) ? post.priority[1] : post.priority)) / 1000).toFixed(1)
                : 0.5
            }</priority>
        </url>`
        )
      )
      .join('')}
</urlset>`

export const get = async (): Promise<EndpointOutput> => ({
  headers: {
    'Content-Type': 'application/xml; charset=utf-8'
  },
  body: await render()
})
