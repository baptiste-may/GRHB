<script setup lang="ts">
import { ChevronLeftIcon, FolderPlusIcon, FilePlusIcon } from "lucide-vue-next";

defineProps<{
    currentSlugLength: number;
    isLoading: boolean;
}>();

const emit = defineEmits<{
    (e: 'back' | 'createFolder' | 'createPost'): void;
}>();
</script>

<template>
    <div class="flex flex-wrap gap-2">
        <button
            :disabled="currentSlugLength === 0"
            class="flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-xl bg-neutral-200 enabled:hover:bg-neutral-300 border rounded-xl enabled:hover:shadow-[0_0_5px_black] cursor-pointer enabled:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            @click="emit('back')"
        >
            <ChevronLeftIcon :size="20" /> Retour
        </button>
        <button
            :disabled="isLoading"
            class="flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-xl bg-neutral-200 enabled:hover:bg-neutral-300 border rounded-xl enabled:hover:shadow-[0_0_5px_black] cursor-pointer enabled:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            @click="emit('createFolder')"
        >
            <FolderPlusIcon :size="20" />
            Nouveau dossier
        </button>
        <button
            :disabled="isLoading"
            class="flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-xl bg-neutral-200 enabled:hover:bg-neutral-300 border rounded-xl enabled:hover:shadow-[0_0_5px_black] cursor-pointer enabled:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            @click="emit('createPost')"
        >
            <FilePlusIcon :size="20" />
            Nouveau post
        </button>
    </div>
</template>
