<script lang="ts">
  import { site } from '$lib/config/site'
  import Icon from '$lib/components/head_icon.svelte'
  import OpenGraph from '$lib/components/head_opengraph.svelte'
  export let post: Urara.Post = undefined
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="manifest" crossorigin="use-credentials" href="/manifest.webmanifest" />
  <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
  <meta name="theme-color" content={site.themeColor} />
  {#if post}
    <title>{post.title ?? post.path} | {site.title}</title>
    <meta name="description" content={post.descr ?? site.descr} />
    {#if post.tags}<meta name="keywords" content={post.tags.toString()} />{/if}
    <link rel="canonical" href={`${site.url + post.path}`} />
  {:else}
    <title>{site.title}</title>
    <meta name="description" content={site.descr} />
    <link rel="canonical" href={site.url} />
  {/if}
  <slot />
</svelte:head>

<Icon />
<OpenGraph {post} />
