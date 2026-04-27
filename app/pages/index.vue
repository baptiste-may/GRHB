<script setup lang="ts">
import type { UnifiedPost } from "~~/lib/types";

const { data: displayPosts } = await useFetch<UnifiedPost[]>("/api/latestPosts");

useSeoMeta({
    title: "GRHB | Accueil",
    description:
        "Bienvenue sur le site du Groupe de Recherches Historiques de Busnes. Découvrez nos derniers articles et recherches.",
});

// Cast required due to Nuxt serialization (Date becomes string)
const formattedPosts = computed(() => {
    return (displayPosts.value || []) as unknown as UnifiedPost[];
});
</script>

<template>
    <UiContainer>
        <h1
            class="flex gap-2 items-center text-2xl font-bold pb-2 border-b mb-4"
        >
            Groupe de Recherches Historiques de Busnes
        </h1>
        <h2 class="flex gap-2 items-center text-2xl font-bold mb-2">
            Derniers posts
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
            <ElementsLatestPost
                v-for="post in formattedPosts"
                :key="post.id"
                :post="post"
            />
        </div>
    </UiContainer>
</template>
