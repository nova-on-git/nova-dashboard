<template>
    <main class="admin-page">
        <mpage>
            <header class="dashboard-header">
                <h1>Blogs</h1>
            </header>

            <rflex class="filter-blogs-row">
                <rflex class="left">
                    <btn
                        @click="selectedFilter = 'all'"
                        :class="{ active: selectedFilter === 'all' }"
                        class="filter-blogs-button"
                        >All Blogs
                    </btn>

                    <btn
                        @click="selectedFilter = 'published'"
                        :class="{ active: selectedFilter === 'published' }"
                        class="filter-blogs-button"
                        >Published
                    </btn>

                    <btn
                        @click="selectedFilter = 'hidden'"
                        :class="{ active: selectedFilter === 'hidden' }"
                        class="filter-blogs-button"
                        >Hidden</btn
                    >
                    <btn
                        @click="selectedFilter = 'draft'"
                        :class="{ active: selectedFilter === 'draft' }"
                        class="filter-blogs-button"
                        >Draft</btn
                    >
                </rflex>

                <rflex class="right">
                    <search
                        placeholder="Search for anything..."
                        v-model="searchQuery"
                    />
                </rflex>
            </rflex>

            <div class="cards">
                <anchor to="/admin/blogs/write-blog" class="add-blog card">
                    <mflex class="content">
                        <Icon
                            icon="material-symbols:add-circle-outline"
                            width="50"
                            color="rgba(0, 0, 0, 0.4)"
                        />
                    </mflex>
                </anchor>

                <div class="card-box" v-for="blog in blogs">
                    <anchor class="card" :to="`/admin/blogs/${blog.id}`">
                        <div class="title">{{ blog.title }}</div>

                        <div class="description">{{ blog.description }}</div>
                        <rflex
                            class="status-chip"
                            :class="{
                                draft: blog.status === 'draft',
                                published: blog.status === 'published',
                                hidden: blog.status === 'hidden',
                            }"
                        >
                            <Icon :icon="getIcon(blog.status)" />
                            {{ blog.status }}
                        </rflex>
                    </anchor>
                    <btn
                        type="button"
                        class="delete-btn"
                        @click.stop="$Blogs.delete(blog.id)"
                    >
                        <Icon icon="material-symbols:close" width="15" />
                    </btn>
                </div>
            </div>
        </mpage>
    </main>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
const selectedFilter = ref<Blog["status"] | "all">("all");
const searchQuery = ref("");

onMounted(async () => {
    await $Blogs.read();
});

const blogs = computed(() => {
    if (searchQuery.value === "")
        return $Blogs.filterByStatus(selectedFilter.value);

    return $Blogs.search(searchQuery.value);
});

function getIcon(status: Blog["status"]) {
    switch (status) {
        case "published":
            return "material-symbols:globe";
        case "draft":
            return "material-symbols:edit-outline-rounded";
        case "hidden":
            return "formkit:hidden";
    }
}

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
});
</script>

<style lang="sass" scoped>
.mpage
    padding-block: 25px 50px

.cards
    display: flex
    gap: 20px
    flex-wrap: wrap

.add-blog
    .content
        height: 100%
        width: 100%
        background: rgba(0, 0, 0, 0.04)
.card-box
    position: relative

.card
    position: relative
    background: white
    align-items: start
    white-space: normal
    display: flex
    flex-direction: column
    padding: 15px
    flex-grow: 1
    border-radius: 5px
    min-height: 275px
    min-width: 208px
    margin-bottom: 10px
    max-width: 208px

    .title
        font-weight: bold

    .description
        font-size: 0.75rem

.status-chip

    position: absolute
    bottom: 10px
    right: 15px
    gap: 2px
    font-size: 0.7rem
    padding: 0px 8px
    border-radius: 15px

    &.hidden
        background-color: red !important

    &.draft
        background-color: lightgreen

    &.published
        background-color: blue


.filter-blogs-row
    flex-wrap: wrap
    gap: 15px
    justify-content: space-between
    margin-bottom: 20px
    .left
        flex-wrap: wrap
        gap: 10px
    .filter-blogs-button
        border: none
        background: white
        padding: 5px 15px
        border-radius: 7px

        &.active
            background: #1a73e8
            color: white

.delete-btn
    position: absolute
    border: none

    top: 5px
    right: 5px


    &:hover
        background: $hover-background
</style>
