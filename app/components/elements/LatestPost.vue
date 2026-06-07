<script setup lang="ts">
import { marked } from "marked";
import { sanitizeHtml } from "~~/lib/sanitize";
import type { UnifiedPost } from "~~/lib/types";

const props = defineProps<{
    post: UnifiedPost;
}>();

const href = computed(() =>
    props.post.isExternal
        ? props.post.path
        : props.post.path + "/" + props.post.slug,
);

const renderedContent = computed(() => {
    // Basic markdown to text/minimal html
    const html = marked.parse(props.post.content) as string;
    // We want to strip images and tables as in the React version
    return sanitizeHtml(html);
});
</script>

<template>
    <NuxtLink
        :href="href"
        :target="post.isExternal ? '_blank' : undefined"
        :rel="post.isExternal ? 'noopener noreferrer' : undefined"
        class="flex flex-col justify-between w-full h-full bg-neutral-200 border hover:bg-neutral-300 hover:shadow-[0_0_10px_black] rounded-lg cursor-pointer scale-95 hover:scale-100 transition-all overflow-hidden"
    >
        <div v-if="post.coverImage" class="relative w-full h-40 border-b">
            <NuxtImg
                :src="post.coverImage"
                :alt="post.title"
                class="w-full h-full object-cover"
                loading="lazy"
                format="webp"
                densities="x1 x2"
            />
        </div>
        <div class="flex flex-col gap-2 p-6 grow">
            <h1 class="font-bold line-clamp-2 border-b">{{ post.title }}</h1>
            <!-- eslint-disable vue/no-v-html -->
            <div
                class="text-base font-light overflow-hidden text-ellipsis **:inline [&_img]:hidden [&_table]:hidden grow line-clamp-2"
                v-html="renderedContent"
            />
            <!-- eslint-enable vue/no-v-html -->
            <p class="text-sm font-bold italic">
                {{ new Date(post.updatedAt).toLocaleDateString("fr") }}
            </p>
            <div
                class="flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-xl bg-neutral-300 hover:bg-neutral-400 border rounded-xl hover:shadow-[0_0_5px_black] transition-all mt-4"
            >
                Voir le post
            </div>
        </div>
    </NuxtLink>
</template>
