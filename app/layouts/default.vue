<template>
    <div
        class="min-h-screen bg-[url('/bg.jpg')] grid grid-rows-[5rem_1fr_auto]"
    >
        <UiHeader />
        <div class="h-full mt-8 mb-24">
            <slot />
        </div>
        <UiFooter />
    </div>
</template>
