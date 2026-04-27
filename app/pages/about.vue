<script setup lang="ts">
import type { Post, Folder } from '@prisma/client';
import type { BreadcrumbsType } from '~/components/ui/Breadcrumbs.vue';

type ContentResponse = {
    type: 'post';
} & Post & { currentBreadcrumbs: BreadcrumbsType } | {
    type: 'folder';
    currentSlug: BreadcrumbsType;
    folders: Folder[];
    posts: Post[];
};

const { data } = await useFetch<ContentResponse>("/api/content");

useSeoMeta({
    title: "GRHB | À propos",
    description:
        "En savoir plus sur le Groupe de Recherches Historiques de Busnes.",
});

const post = computed(() => {
    if (data.value?.type === "folder" && data.value.posts.length > 0) {
        return {
            ...data.value.posts[0],
            currentBreadcrumbs: data.value.currentSlug,
        } as unknown as Post & { currentBreadcrumbs: BreadcrumbsType };
    }
    return null;
});
</script>

<template>
    <UiContainer>
        <ElementsPostComponent v-if="post" :post="post" />
        <div v-else class="p-4 bg-red-100 text-red-700 rounded-lg">
            Veuillez contacter l'administrateur du site
        </div>
    </UiContainer>
</template>
