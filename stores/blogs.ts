import axios from "axios"
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { defineStore } from "pinia"

export const useBlogStore = defineStore("blogs", {
    state: () => ({
        blogs: [] as Blog[],
        loading: false,
    }),

    getters: {
        get(state) {
            return state.blogs
        },

        filterByStatus: (state) => (status: Blog["status"] | "all") => {
            if (status === "all") return state.blogs
            return state.blogs.filter((blogs) => blogs.status === status)
        },

        search: (state) => (searchQuery: string) => {
            if (!searchQuery) {
                return state.blogs
            }

            const lowerCaseQuery = searchQuery.toLowerCase()

            return state.blogs.filter((blog) => {
                const matchesBlog = Object.values(blog).some((value) => {
                    if (typeof value === "string") {
                        return value.toLowerCase().includes(lowerCaseQuery)
                    }

                    if (Array.isArray(value)) {
                        return value.some((item) => {
                            return Object.values(item).some((itemValue) => {
                                return String(itemValue).toLowerCase().includes(lowerCaseQuery)
                            })
                        })
                    }

                    if (typeof value === "object" && value !== null) {
                        return Object.values(value).some((objValue) => {
                            return String(objValue).toLowerCase().includes(lowerCaseQuery)
                        })
                    }
                    return false
                })

                return matchesBlog
            })
        },
    },

    actions: {
        async init() {
            if (!import.meta.client) return
            this.loading = true

            const $db = useDb()

            await this.read()
            this.loading = false

            const colRef = collection($db, "blogs")

            // db hook
            onSnapshot(
                colRef,
                (snapshot) => {
                    console.debug("[Veloris] DB hook 'blogs' ")
                    const blogs: Blog[] = []
                    snapshot.forEach((doc) => {
                        blogs.push({ id: doc.id, ...doc.data() } as Blog)
                    })
                    this.blogs = blogs
                },
                (error) => {
                    console.error("Error getting blogs: ", error)
                }
            )

            // As the cache gets cleared after the doc has been auto saved
            // this would mean the browser was shut down without a chance to save
            // so add the item to the db and clear the cache
            const blogCache = getCache("blogCache")
            if (blogCache) {
                await this.update(blogCache)
                localStorage.removeItem("blogCache")
            }
        },

        /** If the document exists, it will update; if it doesn't, it will create a new one*/
        async update(blog: Blog) {
            const $db = useDb()

            let docRef
            if (!blog.id) {
                console.debug("[Veloris] Adding blog to cloud")

                docRef = doc(collection($db, "blogs"))
                blog.id = docRef.id
            } else {
                console.debug("[Veloris] Updating blog in cloud")

                docRef = doc($db, "blogs", blog.id)
            }

            if (blog.html) {
                blog.htmlUrl = await this.uploadHTMLContent(blog.html, blog.id)
                delete blog.html
            }

            await setDoc(docRef, blog, { merge: true })
        },

        async read() {
            const { data } = await useFetch(`/api/blogs`)
            this.blogs = data.value as Blog[]
        },

        async delete(id: Blog["id"]) {
            await axios.delete(`/api/blogs/${id}`)
        },

        async updateStatus(id: Blog["id"], newStatus: Blog["status"]) {
            await axios.put("/api/blogs/status", { id: id, newStatus: newStatus })
        },

        /** Will load a blog given the id or slug */
        async getBlogById(id: Blog["id"] | Blog["slug"]) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (!this.loading) {
                        clearInterval(interval)
                        resolve(true)
                    }
                }, 100)
            })

            const blog = this.blogs.find((blog) => blog.id === id || blog.slug === id)

            return blog
        },

        async uploadHTMLContent(htmlContent: Blog["html"], id: Blog["id"]) {
            const nuxtApp = useNuxtApp()
            const $storage = nuxtApp.$storage as any
            const storageRef = ref($storage, `blogs/${id}.html`)

            if (!htmlContent) return
            await uploadString(storageRef, htmlContent, "raw", { contentType: "text/html" })

            const downloadURL = await getDownloadURL(storageRef)
            return downloadURL
        },
    },
})
