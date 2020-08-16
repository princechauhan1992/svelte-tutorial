<script>
    import Welcome from './pages/Welcome.svelte'
    import { onMount } from 'svelte'
    import { select } from './select.js'
    import Game from './pages/Game.svelte'

    let celebsPromise
    let state = 'welcome'
    let selection
    const loadCelebs = async () => {
        const res = await fetch(
            'https://cameo-explorer.netlify.app/celebs.json'
        )
        const data = await res.json()
        const lookup = new Map()
        data.forEach((item) => {
            lookup.set(item.id, item)
        })
        const subset = new Set()
        data.forEach((celebrity) => {
            if (celebrity.reviews >= 50) {
                subset.add(celebrity)
                celebrity.similar.forEach((id) => {
                    subset.add(lookup.get(id))
                })
            }
        })
        const celebs = Array.from(subset)
        return {
            celebs,
            lookup,
        }
    }

    onMount(() => {
        celebsPromise = loadCelebs()
    })

    const start = async (e) => {
        const { celebs, lookup } = await celebsPromise
        selection = select(celebs, lookup, e.detail.category.slug)
        state = 'playing'
    }
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 800px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

<main>
    {#if state === 'welcome'}
        <Welcome on:select={start} />
    {:else if state === 'playing'}
        <Game {selection} on:restart={() => (state = 'welcome')} />
    {/if}
</main>
