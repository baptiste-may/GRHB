<script setup lang="ts">
const props = defineProps<{
    open: boolean;
    folderData: { name: string; id?: string } | null;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', name: string): void;
}>();

const folderFormName = ref("");

watch(() => props.folderData, (val) => {
    if (val) folderFormName.value = val.name;
}, { immediate: true });

const handleSubmit = () => {
    emit('submit', folderFormName.value);
};
</script>

<template>
    <UiModal
        :open="open"
        :title="folderData?.id ? 'Renommer le dossier' : 'Créer un dossier'"
        @close="emit('close')"
    >
        <h1 class="text-2xl">
            {{ folderData?.id ? "Renommer le dossier" : "Créer un dossier" }}
        </h1>
        <form
            class="flex flex-col gap-4 min-w-[300px]"
            @submit.prevent="handleSubmit"
        >
            <input
                v-model="folderFormName"
                type="text"
                placeholder="Nom du dossier"
                aria-label="Nom du dossier"
                required
                class="flex justify-center whitespace-nowrap px-4 py-2 text-xl border rounded-xl hover:shadow-[0_0_5px_black] focus:shadow-[0_0_5px_black] outline-none transition-all"
            >
            <button
                type="submit"
                class="flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-xl bg-neutral-200 hover:bg-neutral-300 border rounded-xl hover:shadow-[0_0_5px_black] transition-all"
            >
                {{ folderData?.id ? "Renommer" : "Créer" }}
            </button>
        </form>
    </UiModal>
</template>
