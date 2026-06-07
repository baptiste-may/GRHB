<script setup lang="ts">
import type { Folder, Post } from "@prisma/client";
import type { BreadcrumbsType } from '~/components/ui/Breadcrumbs.vue';

const props = defineProps<{
    breadcrumbs: BreadcrumbsType;
    folders: Folder[];
    posts: Post[];
}>();

const currentSlug = computed(() => {
    const lastItem = props.breadcrumbs.length > 0 ? props.breadcrumbs[props.breadcrumbs.length - 1] : null;
    const path = lastItem ? lastItem.path : '';
    return path.startsWith('/') ? path : '/' + path;
});

const sortedFolders = computed(() => [...props.folders].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
const sortedPosts = computed(() => [...props.posts].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));

function getHref(slug: string) {
    return currentSlug.value + (currentSlug.value.endsWith('/') ? '' : '/') + slug;
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <UiBreadcrumbs :slugs="breadcrumbs" />

        <UiAlert v-if="folders.length === 0 && posts.length === 0">
            Ce dossier est vide
        </UiAlert>

        <ElementsPostsFolderLink
            v-for="folder in sortedFolders" :key="folder.id"
            :folder="folder"
            :href="getHref(folder.slug)"
        />

        <hr v-if="posts.length !== 0 && folders.length !== 0" class="my-4" >

        <ElementsPostsPostLink
            v-for="post in sortedPosts" :key="post.id"
            :post="post"
            :href="getHref(post.slug)"
        />
    </div>
</template>
