<script setup lang="ts">
import { PowerIcon, EyeIcon, EyeOffIcon } from "lucide-vue-next";

const inputPassword = ref("");
const disableInputs = ref(false);
const showPassword = ref(false);
const errorMessage = ref("");

const emit = defineEmits<{
    (e: 'login', password: string): void;
}>();

const { loggedIn, fetch: fetchSession } = useUserSession();

const checkPassword = async (pass: string) => {
    disableInputs.value = true;
    errorMessage.value = "";
    try {
        await $fetch("/api/checkPassword", {
            method: "POST",
            body: { password: pass },
        });
        await fetchSession();
        emit('login', pass);
    } catch (err) {
        console.error(err);
        errorMessage.value = "Mot de passe incorrect ou erreur serveur.";
    } finally {
        disableInputs.value = false;
    }
};
</script>

<template>
    <div v-if="!loggedIn" class="flex flex-col gap-4">
        <h1
            class="flex gap-2 items-center text-2xl font-bold pb-2 border-b mb-4"
        >
            Le mot de passe est requis !
        </h1>
        <form
            class="grid grid-cols-1 md:grid-cols-2 gap-4 w-fit"
            @submit.prevent="checkPassword(inputPassword)"
        >
            <div class="relative">
                <input
                    v-model="inputPassword"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Entrez le mot de passe"
                    aria-label="Mot de passe administrateur"
                    required
                    :disabled="disableInputs"
                    class="flex justify-center whitespace-nowrap px-4 py-2 text-xl border rounded-xl hover:shadow-[0_0_5px_black] focus:shadow-[0_0_5px_black] outline-none transition-all w-full pr-12"
                >
                <button
                    type="button"
                    class="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral-200 rounded-lg transition-colors"
                    :aria-label="showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'"
                    @click="showPassword = !showPassword"
                >
                    <EyeIcon v-if="!showPassword" :size="20" />
                    <EyeOffIcon v-else :size="20" />
                </button>
            </div>
            <button
                type="submit"
                :disabled="disableInputs"
                class="flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-xl bg-neutral-200 enabled:hover:bg-neutral-300 border rounded-xl enabled:hover:shadow-[0_0_5px_black] cursor-pointer enabled:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <PowerIcon :size="20" />
                Accéder
            </button>
        </form>
        <p v-if="errorMessage" class="text-red-600 font-medium" role="alert">
            {{ errorMessage }}
        </p>
    </div>
</template>
