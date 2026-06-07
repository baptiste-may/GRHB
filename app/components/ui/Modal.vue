<script setup lang="ts">
const props = defineProps<{
    open: boolean;
    title: string;
}>();

const emit = defineEmits(["close"]);

const modalRef = ref<HTMLDivElement | null>(null);

watch(
    () => props.open,
    (isOpen, _oldValue, onCleanup) => {
        if (isOpen) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    emit("close");
                }
            };
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";

            nextTick(() => {
                modalRef.value?.focus();
            });

            onCleanup(() => {
                document.removeEventListener("keydown", handleKeyDown);
                document.body.style.overflow = "unset";
            });
        }
    },
);
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div
                v-if="open"
                class="fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-black/75 z-50"
                role="dialog"
                aria-modal="true"
                :aria-label="title"
                @click="$emit('close')"
            >
                <Transition name="scale" appear>
                    <div
                        ref="modalRef"
                        class="flex flex-col gap-4 p-8 bg-white border border-black rounded-lg max-h-[90vh] overflow-y-auto outline-none"
                        tabIndex="-1"
                        @click.stop
                    >
                        <slot />
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.2s ease;
}
.scale-enter-from,
.scale-leave-to {
    transform: scale(0.8);
    opacity: 0;
}
</style>
