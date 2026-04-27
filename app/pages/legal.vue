<script setup lang="ts">
const { data: page } = await useAsyncData("legal", () => {
    return queryCollection("content").path("/legal").first();
});

useSeoMeta({
    title: page.value?.title
        ? `GRHB | ${page.value.title}`
        : "GRHB | Mentions légales",
    description: page.value?.description || "Mentions légales du site.",
});
</script>

<template>
    <UiContainer>
        <ContentRenderer v-if="page" :value="page" />
    </UiContainer>
</template>
