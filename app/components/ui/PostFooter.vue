<script setup lang="ts">
import type { Post } from "@prisma/client";

const props = defineProps<{
    post: Post;
}>();

const updatedAt = computed(() => new Date(props.post.updatedAt));
const createdAt = computed(() => new Date(props.post.createdAt));

const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};
</script>

<template>
    <p class="mt-4 italic font-light text-base">
        Publié le {{ updatedAt.toLocaleDateString("fr", dateFormat) }}
        <template v-if="createdAt.getTime() !== updatedAt.getTime()">
            et modifié le {{ createdAt.toLocaleDateString("fr", dateFormat) }}
        </template>
        par {{ post.author }}
    </p>
</template>