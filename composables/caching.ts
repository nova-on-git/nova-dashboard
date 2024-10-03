/** A caching api that handles data stringification  */
export function cache(cacheName: string, item: any) {
    if (typeof item === "string") {
        localStorage.setItem(cacheName, item)
    } else {
        const itemString = JSON.stringify(item)
        localStorage.setItem(cacheName, itemString)
    }
}

/** Returns a parsed item from cache */
export function getCache(cacheName: string) {
    const cacheString = localStorage.getItem(cacheName)

    if (!cacheString) return

    try {
        const cache = JSON.parse(cacheString)
        return cache
    } catch (error) {
        return null
    }
}
