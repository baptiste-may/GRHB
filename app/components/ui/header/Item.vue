<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next";

const props = withDefaults(defineProps<{
  name: string;
  path: string;
  icon?: LucideIcon;
}>(), {
  icon: undefined
});

const route = useRoute();
const pathname = computed(() => route.path.slice(1));
const isFirst = computed(() => props.icon === undefined);
const isActive = computed(() => ((props.path !== '' || pathname.value === '') && pathname.value.startsWith(props.path)));

</script>

<template>
  <NuxtLink
:class="[
      'flex gap-2 items-center justify-center flex-auto text-xl whitespace-nowrap h-full hover:bg-neutral-200 transition-all',
      isFirst ? '' : 'border-l border-black/25',
      isActive ? 'text-black font-bold underline' : 'text-neutral-800 font-light no-underline'
  ]" :href="'/' + props.path" :aria-label="isFirst ? 'Accueil' : props.name">
    <NuxtImg v-if="isFirst" src="/icon-clean.png" class="md:hidden lg:flex invert w-8 h-8"/>
    <component :is="props.icon" v-else class="md:hidden lg:flex" :stroke-width="isActive ? 2 : 1"/>
    <p class="sm:hidden md:inline">{{ props.name }}</p>
  </NuxtLink>
</template>
