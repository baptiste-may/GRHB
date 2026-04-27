<script setup lang="ts">
import type { Folder } from "@prisma/client";

defineProps<{
    folder: Folder;
    href: string;
}>();
</script>

<template>
    <NuxtLink
        :href="href"
        class="flex items-center px-4 py-2 w-full bg-neutral-200 border hover:bg-neutral-300 no-underline hover:shadow-[0_0_10px_black] rounded-lg cursor-pointer transition-all"
    >
        <div class="flex flex-col overflow-hidden grow">
            <h2 class="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">{{ folder.name }}</h2>
        </div>
        <p>{{ new Date(folder.updatedAt).toLocaleDateString("fr") }}</p>
    </NuxtLink>
</template>
