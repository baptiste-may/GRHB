<script setup lang="ts">
import { EditIcon, TrashIcon } from "lucide-vue-next";
import type { Post } from "@prisma/client";

defineProps<{
    post: Post;
    isRoot: boolean;
}>();

const emit = defineEmits<{
    (e: 'edit' | 'delete', post: Post): void;
}>();

const getPostSnippet = (content: string) => {
    return content.replace(/[#*`[\]()]/g, "").slice(0, 50) + "...";
};
</script>

<template>
    <div
        class="grid grid-cols-1 md:grid-cols-[auto_30%_20%_20%] gap-4 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-lg cursor-pointer transition-all"
        @click="emit('edit', post)"
    >
        <div
            class="flex items-center text-2xl whitespace-nowrap overflow-hidden text-ellipsis"
        >
            {{ post.title }}
        </div>
        <div
            class="flex items-center text-sm font-light overflow-hidden text-ellipsis whitespace-nowrap"
        >
            {{ getPostSnippet(post.content) }}
        </div>
        <div class="flex items-center justify-center text-2xl">
            {{
                new Date(post.updatedAt).toLocaleDateString(
                    "fr",
                )
            }}
        </div>
        <div class="flex justify-end gap-2" @click.stop>
            <button
                class="p-2 bg-neutral-100 rounded-lg hover:bg-white transition-colors"
                title="Modifier"
                @click="emit('edit', post)"
            >
                <EditIcon :size="20" />
            </button>
            <button
                v-if="!isRoot"
                class="p-2 bg-neutral-100 rounded-lg hover:bg-white transition-colors text-red-600"
                title="Supprimer"
                @click="emit('delete', post)"
            >
                <TrashIcon :size="20" />
            </button>
        </div>
    </div>
</template>
