<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next";

const props = defineProps<{
    name: string;
    path: string;
    icon?: LucideIcon;
    pathname: string;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const isActive = computed(() => {
    return (props.path !== '' || props.pathname === '') && props.pathname.startsWith(props.path);
});
</script>

<template>
    <NuxtLink
        :href="'/' + path"
        :class="[
            'flex items-center gap-2 p-8 border-b border-black/25 last:border-b-0 hover:bg-neutral-200 transition-all text-xl whitespace-nowrap',
            isActive ? 'text-black font-bold underline' : 'text-neutral-800 font-light'
        ]"
        @click="emit('close')"
    >
        <NuxtImg v-if="icon === undefined" src="/icon-clean.png" class="md:hidden lg:flex invert w-8 h-8" />
        <component :is="icon" v-else :stroke-width="isActive ? 2 : 1" />
        {{ name }}
    </NuxtLink>
</template>
