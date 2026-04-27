<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next";

const props = defineProps<{
    open: boolean;
    onClose: () => void;
    menu: {
        name: string;
        path: string;
        icon?: LucideIcon;
    }[];
}>();

const route = useRoute();
const pathname = computed(() => route.path.slice(1));

watch(() => props.open, (isOpen) => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
}, { immediate: true });

onUnmounted(() => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
    }
});
</script>

<template>
    <Transition name="sidebar">
        <div
v-if="open" class="absolute w-screen h-screen bg-black/50 z-10" role="dialog" aria-modal="true"
            aria-label="Menu de navigation" @click="onClose">
            <div
class="relative flex flex-col w-full h-full pt-12 bg-neutral-100 sidebar-content"
                @click="e => e.stopPropagation()">
                <UiHeaderSideBarItem
                    v-for="item in menu"
                    :key="item.path"
                    v-bind="item"
                    :pathname="pathname"
                    @close="onClose"
                />
            </div>
        </div>
    </Transition>
</template>
