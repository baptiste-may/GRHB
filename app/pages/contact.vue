<script setup lang="ts">
import { User, Mail, Type, FileText, Send } from "lucide-vue-next";

useSeoMeta({
    title: "GRHB | Contact",
    description:
        "Contactez le Groupe de Recherches Historiques de Busnes pour toute question ou information.",
});

const nameInput = ref("");
const emailInput = ref("");
const subjectInput = ref("");
const contentInput = ref("");
const honeypotInput = ref("");
const submitDisabled = ref(false);

const sendEmail = async () => {
    submitDisabled.value = true;
    try {
        await $fetch("/api/sendMail", {
            method: "POST",
            body: {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                content: contentInput.value,
                honeypot: honeypotInput.value,
            },
        });
        alert("Message envoyé !");
        nameInput.value = "";
        emailInput.value = "";
        subjectInput.value = "";
        contentInput.value = "";
        honeypotInput.value = "";
    } catch (e) {
        const error = e as { statusText?: string, message?: string, data?: { statusText?: string } };
        const details = error.data?.statusText || error.statusText || error.message;
        alert(
            `Le message n'a pas pu être envoyé !\n\n${details}`,
        );
    } finally {
        submitDisabled.value = false;
    }
};

const isFormValid = computed(() => {
    return (
        nameInput.value !== "" &&
        emailInput.value !== "" &&
        subjectInput.value !== "" &&
        contentInput.value !== ""
    );
});
</script>

<template>
    <UiContainer>
        <h1
            class="flex gap-2 items-center text-2xl font-bold pb-2 border-b mb-4"
        >
            Nous Contacter
        </h1>
        <form
            class="grid grid-cols-1 sm:grid-cols-2 gap-8"
            @submit.prevent="sendEmail"
        >
            <!-- Honeypot field (hidden from users) -->
            <input
                v-model="honeypotInput"
                type="text"
                name="honeypot"
                class="hidden"
                tabindex="-1"
                autocomplete="off"
            >
            
            <div>
                <h2 class="flex gap-2 items-center text-2xl font-bold mb-2">
                    <label
                        for="name-input"
                        class="flex items-center gap-2 cursor-pointer"
                    >
                        <User :size="20" />
                        Votre nom
                        <span class="text-red-500">*</span>
                    </label>
                </h2>
                <input
                    id="name-input"
                    v-model="nameInput"
                    type="text"
                    placeholder="Entrez votre nom"
                    required
                    class="flex justify-center whitespace-nowrap px-4 py-2 text-xl border rounded-xl hover:shadow-[0_0_5px_black] focus:shadow-[0_0_5px_black] outline-none transition-all w-full"
                >
            </div>
            <div>
                <h2 class="flex gap-2 items-center text-2xl font-bold mb-2">
                    <label
                        for="email-input"
                        class="flex items-center gap-2 cursor-pointer"
                    >
                        <Mail :size="20" />
                        Votre adresse mail
                        <span class="text-red-500">*</span>
                    </label>
                </h2>
                <input
                    id="email-input"
                    v-model="emailInput"
                    type="email"
                    placeholder="Entrez votre adresse mail"
                    required
                    class="flex justify-center whitespace-nowrap px-4 py-2 text-xl border rounded-xl hover:shadow-[0_0_5px_black] focus:shadow-[0_0_5px_black] outline-none transition-all w-full"
                >
            </div>
            <div class="sm:col-span-2">
                <h2 class="flex gap-2 items-center text-2xl font-bold mb-2">
                    <label
                        for="subject-input"
                        class="flex items-center gap-2 cursor-pointer"
                    >
                        <Type :size="20" />
                        Le sujet de votre message
                        <span class="text-red-500">*</span>
                    </label>
                </h2>
                <input
                    id="subject-input"
                    v-model="subjectInput"
                    type="text"
                    placeholder="Entrez votre sujet"
                    required
                    class="flex justify-center whitespace-nowrap px-4 py-2 text-xl border rounded-xl hover:shadow-[0_0_5px_black] focus:shadow-[0_0_5px_black] outline-none transition-all w-full"
                >
            </div>
            <div class="sm:col-span-2">
                <h2 class="flex gap-2 items-center text-2xl font-bold mb-2">
                    <label
                        for="content-input"
                        class="flex items-center gap-2 cursor-pointer"
                    >
                        <FileText :size="20" />
                        Votre message
                        <span class="text-red-500">*</span>
                    </label>
                </h2>
                <textarea
                    id="content-input"
                    v-model="contentInput"
                    placeholder="Entrez votre message"
                    required
                    class="flex w-full min-h-48 px-4 py-2 text-xl border rounded-xl hover:shadow-[0_0_5px_black] focus:shadow-[0_0_5px_black] outline-none transition-all"
                />
            </div>
            <div class="flex justify-center w-full sm:col-span-2">
                <button
                    class="flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2 text-xl bg-neutral-200 enabled:hover:bg-neutral-300 border rounded-xl enabled:hover:shadow-[0_0_5px_black] cursor-pointer enabled:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full md:w-1/3"
                    type="submit"
                    :disabled="submitDisabled || !isFormValid"
                >
                    <Send :size="20" />
                    Envoyer
                </button>
            </div>
        </form>
    </UiContainer>
</template>
