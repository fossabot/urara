<script lang="ts">
  import { browser } from '$app/env'
  import { site } from '$lib/config/site'
  import { config as headerConfig } from '$lib/config/header'
  import Theme from '$lib/components/header_theme.svelte'

  let pin: boolean
  let percent: number
  let [scrollY, lastY] = [0, 0]

  const checkY = (scrollY: number) => {
    const y = lastY - scrollY
    lastY = scrollY
    if (browser) {
      percent =
        Math.round((scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 10000) / 100
    }
    return y < 0 ? false : true
  }

  $: pin = checkY(scrollY)
</script>

<svelte:window bind:scrollY />

<header
  id="header"
  class="navbar fixed w-screen z-50 mb-2 shadow-lg bg-neutral bg-opacity-50 backdrop-filter backdrop-blur rounded-none text-neutral-content transform-gpu transition-transform ease-in-out duration-250"
  class:-translate-y-32={!pin || scrollY === 0}
>
  <div class="flex-1">
    <a href="/" class="btn btn-ghost rounded-full normal-case text-lg font-bold">
      {site.title}
    </a>
  </div>
  <div class="flex-none">
    {#if headerConfig.nav}
      <nav class="<lg:hidden">
        {#each Object.entries(headerConfig.nav) as [href, name]}
          <a {href} sveltekit:prefetch class="btn btn-ghost normal-case">{name}</a>
        {/each}
      </nav>
      <div class="lg:hidden dropdown dropdown-end">
        <div tabindex="0" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-none" viewBox="0 0 24 24">
            <path
              stroke="current cap-round join-round width-2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="p-2 shadow-2xl menu dropdown-content bg-base-200 text-base-content rounded-box w-52"
          class:hidden={pin === false}
        >
          {#each Object.entries(headerConfig.nav) as [href, name]}
            <li>
              <a {href}>{name}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    <Theme {pin} />
  </div>
</header>

<button
  id="totop"
  on:click={() => window.scrollTo(0, 0)}
  aria-label="scroll to top"
  class="btn btn-circle btn-lg fixed z-50 backdrop-filter backdrop-blur border-none shadow-lg bg-opacity-50 hover:bg-opacity-60 bottom-6 right-6 transform-gpu transition-all ease-in-out"
  class:translate-y-24={!pin || scrollY === 0}
>
  <svg class="h-16 w-16 fixed" stroke="accent width-3">
    <circle
      class="transform-gpu transition-transform origin-center -rotate-90 stroke-accent stroke-width-4 stroke-cap-round fill-transparent"
      r="30"
      cx="32"
      cy="32"
      stroke-dasharray={30 * 2 * Math.PI}
      stroke-dashoffset={30 * 2 * Math.PI - (percent / 100) * (30 * 2 * Math.PI)}
    />
  </svg>
  <svg xmlns="http://www.w3.org/2000/svg" class="inlinw-block h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path stroke="current cap-round join-round width-2" d="M5 15l7-7 7 7" />
  </svg>
</button>
