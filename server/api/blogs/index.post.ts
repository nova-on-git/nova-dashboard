import { promises as fs } from "fs"
import { resolve } from "path"
import { readBody } from "h3"

export default defineEventHandler(async (event) => {
    // Read the body of the request
    const body = await readBody(event)
    const { content, filename } = body

    if (!filename || !filename.endsWith(".md")) {
        throw createError({
            statusCode: 400,
            message: "Filename must be provided and end with .md",
        })
    }

    const filePath = resolve("content/blogs", filename)

    try {
        await fs.writeFile(filePath, content, "utf-8")
        console.log("Markdown file saved successfully!")
    } catch (error) {
        console.error(error)
    }
})
