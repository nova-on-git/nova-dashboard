import axios from "axios"
import { collection, getDocs } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db

    const colRef = collection(db, "blogs")

    const querySnapshot = await getDocs(colRef)

    const blogs: Blog[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Blog, "html" | "htmlUrl">
        return {
            id: doc.id,
            ...data,
        } as Blog
    })

    const fetchHtmlForBlogs = async (blogs: Blog[]) => {
        const promises = blogs.map(async (blog) => {
            if (blog.htmlUrl) {
                try {
                    const response = await axios.get(blog.htmlUrl)
                    blog.html = response.data
                } catch (error) {
                    console.error(`Error fetching HTML for blog ${blog.id}:`, error)
                    blog.html = ""
                }
            }
            return blog
        })

        return Promise.all(promises)
    }

    const blogsWithHtml = await fetchHtmlForBlogs(blogs)

    return blogsWithHtml
})
