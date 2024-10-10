<template>
    <div class="page-container">
        <div class="editor-container" :class="{ asideActive: asideActive }">
            <rflex class="top-row">
                <div class="saving" :class="{ saved: !saving }">
                    {{ saving ? "Saving..." : "Saved" }}
                </div>
                <btn @click="asideActive = !asideActive">File</btn>
            </rflex>

            <header>
                <cflex>
                    <input
                        class="title-input"
                        type="text"
                        placeholder="Add your blog title here..."
                        v-model="blog.title"
                    />

                    <rflex>
                        <div class="author-input-box">
                            by
                            <input
                                class="author-input"
                                type="text"
                                v-model="blog.author"
                            />
                        </div>
                        <div>Read: {{ readTime }} minutes</div>
                    </rflex>
                </cflex>
            </header>

            <ClientOnly fallback-tag="div">
                <QuillEditor
                    class="editor"
                    theme="snow"
                    toolbar="full"
                    v-model:content="blog.html"
                    contentType="html"
                />
            </ClientOnly>
        </div>

        <aside ref="asideRef" :class="{ active: asideActive }">
            <cflex>
                <rflex class="status-buttons">
                    <btn
                        @click="handleStatusButtons('published')"
                        :class="{ active: blog.status === 'published' }"
                        :disabled="blog.status === 'published'"
                    >
                        {{
                            blog.status !== "published"
                                ? "Publish"
                                : "Published"
                        }}
                    </btn>

                    <btn
                        @click="handleStatusButtons('hidden')"
                        :class="{ active: blog.status === 'hidden' }"
                        :disabled="blog.status === 'hidden'"
                    >
                        {{ blog.status === "hidden" ? "Hidden" : "Hide" }}
                    </btn>

                    <btn
                        @click="handleStatusButtons('draft')"
                        :class="{ active: blog.status === 'draft' }"
                        :disabled="blog.status === 'draft'"
                        >Draft</btn
                    >
                </rflex>
            </cflex>

            <cflex class="details">
                <cflex>
                    <label for="blog-title ">Title</label>
                    <input
                        type="text"
                        class="input"
                        v-model="blog.title"
                        required
                    />
                </cflex>

                <cflex>
                    <label for="blog-description">Description</label>
                    <textarea
                        rows="8"
                        class="input"
                        type="text"
                        v-model="blog.description"
                        required
                    />
                </cflex>

                <cflex>
                    <label for="blog-author input">Author</label>
                    <input
                        type="text"
                        class="input"
                        v-model="blog.author"
                        required
                    />
                </cflex>

                <cflex>
                    <label for="blog-slug input">Slug</label>
                    <!-- <input type="text" class="input" v-model="blog.slug" required /> -->
                    <field
                        @keydown.space.prevent="addHyphenToSlug"
                        type="text"
                        :validator="slugValidator"
                        v-model="blog.slug"
                        required
                    >
                        <error>The slug must be unique.</error>
                    </field>
                </cflex>

                <!-- <div class="divider" />

                <rflex class="input checkbox-input">
                    <input type="checkbox" v-model="blog.openForComments" required />
                    <label for="blog-author">Open for comments</label>
                </rflex> -->

                <div class="divider" />

                <cflex @click="tagInputRef && tagInputRef.focus()">
                    <label for="blog-tags">Tags</label>

                    <rflex class="tags-input input">
                        <div
                            @click="removeTag(tag)"
                            class="tag"
                            v-for="tag in blog.tags"
                        >
                            {{ tag }}
                        </div>
                        <input
                            ref="tagInputRef"
                            @keydown.return="addTag"
                            @keydown.space="addTag(currentTag)"
                            type="text"
                            name="blog-tags"
                            v-model="currentTag"
                        />
                    </rflex>
                </cflex>
            </cflex>

            <div class="delete-row">
                <btn @click="handleDelete(blog.id)">Delete Article</btn>
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { onClickOutside } from "@vueuse/core";

const tagInputRef = ref<HTMLInputElement | null>(null);
const asideRef = ref(null);
const route = useRoute();
const blogId = route.params.id as string;
const asideActive = ref(false);
const saving = ref(false);
const currentTag = ref("");

function slugValidator(): boolean {
    const otherBlogs = $Blogs.get.filter((blogObj) => blogObj.id != blogId);

    const slugExists = otherBlogs.some((blogObj) => {
        return blog.value.slug === blogObj.slug;
    });

    return slugExists;
}
function addHyphenToSlug() {
    if (!blog.value.slug.endsWith("-")) {
        blog.value.slug += "-";
    }
}
function addTag(tag: string) {
    if (tag.trim() === "") return;

    blog.value.tags?.push(tag);
    currentTag.value = "";
}

function removeTag(tag: string) {
    blog.value.tags = blog.value.tags?.filter((i) => i !== tag);
}

async function handleDelete(id: Blog["id"]) {
    await $Blogs.delete(id);
    localStorage.removeItem("blogCache");
    navigateTo("/admin/blogs");
}

function handleStatusButtons(status: Blog["status"]) {
    if (blogCanPublish.value) {
        $Blogs.updateStatus(blog.value.id, status);
        blog.value.status = status;
    } else {
        createMessage({
            preset: "danger",
            content:
                "You cannot publish this blog before filling out the required details.",
        });
    }
}

const blogCanPublish = computed(() => {
    return (
        blog.value.title.trim() !== "" &&
        blog.value.description.trim() !== "" &&
        blog.value.author.trim() !== "" &&
        blog.value.slug.trim() !== ""
    );
});

const blog = ref<Blog>({
    id: "",
    title: "",
    description: "",
    author: $CurrentUser.displayName || "",
    openForComments: false,
    html: "",
    slug: "",
    status: "draft",
    tags: [],
});

const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
    },
    editing: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

let timeoutId: ReturnType<typeof setTimeout> | null = null;
watch(
    blog,
    (newValue) => {
        if (timeoutId) clearTimeout(timeoutId);
        saving.value = true;

        timeoutId = setTimeout(() => {
            localStorage.setItem("blogCache", JSON.stringify(newValue));
            saving.value = false;
        }, 500);

        if (newValue.slug) {
            newValue.slug = newValue.slug.replace(/\s+/g, "-");
        }

        emit("update:modelValue", newValue);
    },
    { deep: true },
);

async function initEditor() {
    let blogData: Blog;

    if (!props.editing) {
        blogData = getCache("blogCache") as Blog;
    } else {
        blogData = (await $Blogs.getBlogById(blogId)) as Blog;
    }

    if (blogData) {
        Object.assign(blog.value, {
            id: blogData.id,
            title: blogData.title,
            description: blogData.description,
            author: blogData.author,
            openForComments: blogData.openForComments,
            html: blogData.html,
            slug: blogData.slug,
            status: blogData.status,
            tags: blogData.tags,
        });
        cache("blogCache", blogData);
    } else {
        console.warn("blogObj is undefined or not properly initialized");
    }

    cache("blogCache", blogData);
}

onMounted(async () => {
    await initEditor();
});

onUnmounted(async () => {
    const blog = getCache("blogCache");

    if (blog) {
        try {
            const slugExists = slugValidator();
            if (slugExists) blog.slug = "";
            await $Blogs.update(blog);
            localStorage.removeItem("blogCache");
        } catch (error) {
            console.log(error);
        }
    }
});
const readTime = computed(() => {
    const blogLength = blog.value.html ? blog.value.html.length : 0;
    // Avg read speed: 1000 characters per minute
    const readMinutes = Math.ceil(blogLength / 1000);
    return readMinutes;
});

onClickOutside(asideRef, () => {
    asideActive.value = false;
});

definePageMeta({
    layout: "dashboard",
    auth: "admin-auth",
});
</script>
<style lang="sass" scoped>
$asideWidth : 400px
$editorWidth: 100vw

.top-row
    justify-content: end
    padding-inline: 15px
    gap: 15px

    .saving
        position: relative
        line-height: 1

        &::before
            content: ""
            height: 5px
            width: 5px
            position: absolute
            left: -10px
            top: 6px
            background: red
            border-radius: 50%

        &.saved
            &::before
                background: green

    .btn
        border: none
        background: $hover-background
        width: 70px
        justify-content: center

.page-container
    margin-top: 25px
    position: relative
    margin-inline: auto
    max-width: 850px

header
    padding-bottom: 25px
    padding: 25px 50px 25px 50px

    .title-input
        padding: 0
        font-size: 2.25rem
        font-weight: bold

    .rflex
        justify-content: space-between
        font-size: 0.9rem

    .author-input-box
        opacity: 0.8

        .author-input
            padding: 0

.editor-container
    // padding: 25px 50px 0 50px
    position: relative
    background: white
    max-width: 100%
    border-radius: 5px
    left: 0
    box-shadow: 0px 5px 10px 10px rgba(0, 0, 0, 0.05)
    // outline: 1px solid rgba(0, 0, 0, 0.1)
    min-height: calc( 100vh - 115px )
    transition: left 0.15s ease-in
    z-index: 3
    width: $editorWidth


    &.asideActive
        left: calc(-#{$asideWidth} / 2)


    .editor
        height: 500px
        z-index: 10
        border: none

.tags-input
    gap: 10px
    padding: 15px
    align-items: center
    background: rgba(255, 255, 255, 0.7)
    margin-bottom: 20px
    font-size: 0.9rem
    border-radius: 3px
    flex-wrap: wrap

    input, .input, .field
        background: transparent
        width: 100%
        padding-inline: 0
        margin-block: auto
        min-width: 0px
        width: min-content

    .tag
        cursor: pointer
        background: $hover-background
        padding: 3px 15px
        user-select: none
        border-radius: 15px

.top-row
    border-bottom: 1px solid rgba(0, 0, 0, 0.1)
    height: 50px
    background: white

.status-buttons
    margin-bottom: 25px
    gap: 10px
    .btn
        padding: 5px
        border-radius: 3px
        justify-content: center
        border: none
        background: white
        flex-grow: 1
        &.active
            background: #1a73e8
            color: white
.divider
    border-bottom: 1px solid rgba(0, 0, 0, 0.1)
    margin-block: 20px

aside
    position: absolute
    top: 0
    right: 0
    padding-inline: 25px
    height: 100px
    width: $asideWidth
    transition: right 0.15s ease-in
    height: 100%
    z-index: 500 !important
    display: flex
    z-index: 1
    flex-direction: column
    justify-content: space-between

    &.active
        right: calc( -#{$asideWidth} / 2 )

    .delete-row
        text-align: center
        margin-top: auto
        padding-top: 25px
        color: rgba(255, 0, 0, 0.7)
        border-top: 1px solid rgba(255, 0, 0, 0.5)

        .btn
            border: none
            margin-inline: auto

            &:hover
                background: rgba(0, 0, 0, 0.05)

    .input, .field
        border: none
        margin-left: 3px
        padding-inline: 10px
        margin-bottom: 20px
        border: 1px solid rgba(0, 0, 0, 0.1)


:deep(.field)
    input
        border: none
.blog-title
    position: relative
    top: 20px
    font-size: 0.7rem

input, textarea, .input, .field
    padding-block: 10px

    margin: 0
    border: none
    background: rgba(0, 0, 0, 0.05)
    background: rgba(255, 255, 255, 0.7)

    font-size: 0.9rem
    border-radius: 3px

    &:focus
        outline: none
</style>

<style scoped lang="css">
:deep(.ql-editor) {
    min-height: 500px;
}

:deep(.ql-editor) {
    height: 100% !important;
}

:deep(.ql-toolbar.ql-snow) {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

:deep(.ql-container.ql-snow) {
    border: none;
}

:deep(.ql-editor) {
    padding: 25px 0px;
}
:deep(.ql-snow) {
    border: none;
    border-bottom: 1px solid lightgrey;
    border-top: 1px solid lightgrey;
    padding-inline: 0;
    margin-inline: 45px;
    margin-bottom: 10px;
}

.output {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.resizable {
    position: relative; /* Needed for positioning the resize handle */
}

.resize-handle {
    width: 10px;
    height: 10px;
    background: red; /* Handle color */
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: nwse-resize; /* Resizing cursor */
    z-index: 1;
}
</style>
