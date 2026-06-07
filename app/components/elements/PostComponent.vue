<script setup lang="ts">
import { marked } from 'marked';
import { sanitizeHtml } from '~~/lib/sanitize';
import type { Post } from "@prisma/client";
import type { BreadcrumbsType } from '~/components/ui/Breadcrumbs.vue';

const props = defineProps<{
    post: Post & {
        currentBreadcrumbs: BreadcrumbsType;
    };
}>();

const breadcrumbs = computed(() => {
    const lastItem = props.post.currentBreadcrumbs.length > 0
        ? props.post.currentBreadcrumbs[props.post.currentBreadcrumbs.length - 1]
        : null;
    const parentPath = lastItem ? lastItem.path : '';

    // Ensure parentPath ends correctly and starts with /
    const base = parentPath.startsWith('/') ? parentPath : '/' + parentPath;
    const fullPath = base + (base.endsWith('/') ? '' : '/') + props.post.slug;

    return [
        ...props.post.currentBreadcrumbs,
        {
            name: props.post.title,
            path: fullPath,
            folderId: lastItem ? lastItem.folderId : null
        }
    ];
});

const renderedContent = computed(() => sanitizeHtml(marked.parse(props.post.content) as string));
</script>

<template>
    <div class="flex flex-col gap-4">
        <UiBreadcrumbs :slugs="breadcrumbs" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="renderedContent"/>
        <UiPostFooter :post="post" />
    </div>
</template>
