<script setup lang="ts">
import { EditIcon, TrashIcon } from "lucide-vue-next";
import type { Folder } from "@prisma/client";

defineProps<{
    folder: Folder;
    isRoot: boolean;
}>();

const emit = defineEmits<{
    (e: 'open' | 'edit' | 'delete', folder: Folder): void;
}>();
</script>

<template>
    <div
        class="grid grid-cols-1 md:grid-cols-[auto_30%_20%_20%] gap-4 px-4 py-2 bg-neutral-300 hover:bg-neutral-400 rounded-lg cursor-pointer transition-all"
        @click="emit('open', folder)"
    >
        <div
            class="flex items-center text-2xl whitespace-nowrap overflow-hidden text-ellipsis"
        >
            {{ folder.name }}
        </div>
        <div class="flex items-center text-neutral-600 italic">
            Dossier
        </div>
        <div class="flex items-center justify-center text-2xl">
            {{
                new Date(folder.updatedAt).toLocaleDateString(
                    "fr",
                )
            }}
        </div>
        <div class="flex justify-end gap-2" @click.stop>
            <button
                class="p-2 bg-neutral-100 rounded-lg hover:bg-white transition-colors"
                title="Ouvrir"
                @click="emit('open', folder)"
            >
                Ouvrir
            </button>
            <button
                v-if="!isRoot"
                class="p-2 bg-neutral-100 rounded-lg hover:bg-white transition-colors"
                @click="emit('edit', folder)"
            >
                <EditIcon :size="20" />
            </button>
            <button
                v-if="!isRoot"
                class="p-2 bg-neutral-100 rounded-lg hover:bg-white transition-colors text-red-600"
                @click="emit('delete', folder)"
            >
                <TrashIcon :size="20" />
            </button>
        </div>
    </div>
</template>
