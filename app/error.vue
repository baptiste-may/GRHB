<script setup lang="ts">
import type { NuxtError } from "#app";

const props = withDefaults(
    defineProps<{
        error?: NuxtError;
    }>(),
    {
        error: () => ({ statusCode: 500, statusMessage: "Unknown Error" } as NuxtError),
    },
);

const is404 = computed(() => props.error?.statusCode === 404);

useSeoMeta({
    title: is404.value ? "GRHB | Page non trouvée" : "GRHB | Une erreur est survenue",
    robots: "noindex, nofollow",
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
    <NuxtLayout>
        <UiContainer>
            <div v-if="is404">
                <h1 class="text-2xl font-bold mb-4">Cette page n'existe pas !</h1>
                <p>Cet article a peut-être été supprimé.</p>
                <p class="mb-6">Vérifiez si l'écriture de l'URL est correcte.</p>
            </div>
            <div v-else>
                <h1 class="text-2xl font-bold mb-4">Une erreur est survenue</h1>
                <p class="mb-6">
                    {{ error?.statusMessage || "Une erreur inattendue s'est produite." }}
                </p>
            </div>
            <button
                @click="handleError"
            >
                Retour à l'accueil
            </button>
        </UiContainer>
    </NuxtLayout>
</template>
