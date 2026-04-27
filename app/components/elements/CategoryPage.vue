<script setup lang="ts">
import type { Post, Folder } from '@prisma/client';
import type { BreadcrumbsType } from '../ui/Breadcrumbs.vue';

const props = defineProps<{
    folderSlug: string;
}>();

const route = useRoute();
const slug = computed(() => {
    const s = route.params.slug;
    return Array.isArray(s) ? s.join("/") : s || "";
});

const fetchPath = computed(() => {
    const base = props.folderSlug;
    const extra = slug.value;
    return `/api/content/${base}${extra ? "/" + extra : ""}`;
});

type ContentResponse = {
    type: 'post';
} & Post & { currentBreadcrumbs: BreadcrumbsType } | {
    type: 'folder';
    currentSlug: BreadcrumbsType;
    folders: Folder[];
    posts: Post[];
};

const { data, error } = await useFetch<ContentResponse>(() => fetchPath.value);

if (error.value) {
    throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
        fatal: true,
    });
}

useSeoMeta({
    title: () => {
        if (!data.value) return "GRHB | Chargement...";
        if (data.value.type === "post") {
            return `GRHB | ${data.value.title}`;
        }
        const currentFolder =
            data.value.currentSlug?.[data.value.currentSlug.length - 1];
        const name = currentFolder
            ? currentFolder.name
            : props.folderSlug.charAt(0).toUpperCase() +
              props.folderSlug.slice(1);
        return `GRHB | ${name}`;
    },
    description: () => {
        if (!data.value) return "";
        if (data.value.type === "post") {
            return data.value.content
                ? data.value.content.slice(0, 160).replace(/[#*`[\]()]/g, "") +
                      "..."
                : "";
        }
        const currentFolder =
            data.value.currentSlug?.[data.value.currentSlug.length - 1];
        const name = currentFolder
            ? currentFolder.name
            : props.folderSlug.charAt(0).toUpperCase() +
              props.folderSlug.slice(1);
        return `Retrouvez tous les articles et dossiers de la catégorie ${name}.`;
    },
});
</script>

<template>
    <UiContainer v-if="data">
        <ElementsPostComponent v-if="data.type === 'post'" :post="data" />
        <ElementsPosts
            v-else-if="data.type === 'folder'"
            :breadcrumbs="data.currentSlug"
            :folders="data.folders"
            :posts="data.posts"
        />
    </UiContainer>
</template>
