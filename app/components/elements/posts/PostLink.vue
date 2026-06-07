<script setup lang="ts">
import type { Post } from "@prisma/client";

defineProps<{
    post: Post;
    href: string;
}>();

function getPostSnippet(content: string) {
    // Basic stripping of markdown/html for snippet
    return content.replace(/[#*`[\]()]/g, "").slice(0, 100) + "...";
}
</script>

<template>
    <NuxtLink
        :href="href"
        class="flex items-center px-4 py-2 w-full bg-neutral-200 border hover:bg-neutral-300 no-underline hover:shadow-[0_0_10px_black] rounded-lg cursor-pointer transition-all"
    >
        <div class="flex flex-col overflow-hidden grow">
            <h2 class="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">{{ post.title }}</h2>
            <div class="text-sm font-light whitespace-nowrap overflow-hidden text-ellipsis pr-4">
                {{ getPostSnippet(post.content) }}
            </div>
        </div>
        <p>{{ new Date(post.updatedAt).toLocaleDateString("fr") }}</p>
    </NuxtLink>
</template>
