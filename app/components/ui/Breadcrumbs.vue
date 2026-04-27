<script setup lang="ts">
export type BreadcrumbsType = {
  name: string;
  path: string;
  folderId: null | string;
}[];

defineProps<{
  slugs: BreadcrumbsType;
}>();
</script>

<template>
  <nav aria-label="Fil d'Ariane" class="flex flex-col items-start md:flex-row mb-4">
    <ol class="flex flex-wrap items-center">
      <li v-for="({name, path}, i) in slugs" :key="path" class="flex items-center">
        <span v-if="i !== 0" class="mx-2 hidden md:inline text-neutral-500" aria-hidden="true">{{'>'}}</span>
        <NuxtLink
:href="path.startsWith('/') ? path : '/' + path" :class="[
            'no-underline hover:underline transition-all',
            i + 1 === slugs.length ? 'font-bold text-black' : 'text-neutral-500'
        ]" :aria-current="i + 1 === slugs.length ? 'page' : undefined">
          {{name}}
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
</style>
