<script setup lang="ts">
const props = defineProps<{
    open: boolean;
    postData: { title: string; content: string; author: string; id?: string } | null;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', form: { title: string; content: string; author: string }): void;
}>();

const postForm = reactive({
    title: "",
    content: "",
    author: "",
});

watch(() => props.postData, (val) => {
    if (val) {
        postForm.title = val.title;
        postForm.content = val.content;
        postForm.author = val.author;
    }
}, { immediate: true });

const handleSubmit = () => {
    emit('submit', { ...postForm });
};
</script>

<template>
    <UiModal
        :open="open"
        :title="postData?.id ? 'Modifier le post' : 'Créer un post'"
        @close="emit('close')"
    >
        <h1 class="text-2xl">
            {{ postData?.id ? "Modifier le post" : "Créer un post" }}
        </h1>
        <form
            class="flex flex-col gap-4 w-full md:min-w-[800px]"
            @submit.prevent="handleSubmit"
        >
            <div class="flex flex-col md:flex-row md:items-center gap-2">
                <label for="post-title" class="text-2xl whitespace-nowrap">Titre: </label>
                <input
                    id="post-title"
                    v-model="postForm.title"
                    type="text"
                    placeholder="Titre du post"
                    required
                    class="flex grow justify-center whitespace-nowrap px-4 py-2 text-xl border rounded-xl hover:shadow-[0_0_5px_black] focus:shadow-[0_0_5px_black] outline-none transition-all"
                >
            </div>

            <UiTipTapEditor v-model="postForm.content" />

            <div class="flex flex-col md:flex-row md:items-center gap-2">
                <label for="post-author" class="text-2xl whitespace-nowrap">Auteur: </label>
                <input
                    id="post-author"
                    v-model="postForm.author"
                    type="text"
                    placeholder="Auteur"
                    required
                    class="flex grow justify-center whitespace-nowrap px-4 py-2 text-xl border rounded-xl hover:shadow-[0_0_5px_black] focus:shadow-[0_0_5px_black] outline-none transition-all"
                >
            </div>

            <button
                type="submit"
                class="flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-xl bg-neutral-200 hover:bg-neutral-300 border rounded-xl hover:shadow-[0_0_5px_black] transition-all"
            >
                {{ postData?.id ? "Modifier" : "Créer" }}
            </button>
        </form>
    </UiModal>
</template>
