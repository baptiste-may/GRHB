<script setup lang="ts">
const { data: page } = await useAsyncData("privacy-policy", () => {
    return queryCollection("content").path("/privacy-policy").first();
});

useSeoMeta({
    title: page.value?.title
        ? `GRHB | ${page.value.title}`
        : "GRHB | Politique de confidentialité",
    description:
        page.value?.description || "Politique de confidentialité du site.",
});
</script>

<template>
    <UiContainer>
        <ContentRenderer v-if="page" :value="page" />
    </UiContainer>
</template>
