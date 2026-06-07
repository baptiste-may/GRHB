<script setup lang="ts">
import { LogInIcon } from "lucide-vue-next";
const { loggedIn } = useUserSession();

const loginWithOVH = () => {
    window.location.href = "/api/auth/ovh";
};
</script>

<template>
    <div v-if="!loggedIn" class="flex flex-col gap-4">
        <h1>Administration</h1>

        <div class="flex flex-col gap-4">
            <UiAlert>
                L'accès à cette section est réservé aux membres autorisés du GRHB.
                Veuillez vous identifier via OVHcloud.
            </UiAlert>

            <button
                type="button"
                class="!bg-[#0042d3] !text-white hover:!bg-[#0031a1] !border-none"
                @click="loginWithOVH"
            >
                <LogInIcon/>
                Se connecter avec OVHcloud
            </button>
        </div>
    </div>
</template>
