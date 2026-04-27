<script setup lang="ts">
</script>
<template>
  <footer class="flex flex-col gap-2 w-full bg-neutral-100 text-sm font-light">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-2 px-8 py-4">
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-base font-bold">Plan du site :</h1>
        <div class="grid grid-cols-2 gap-x-8 gap-y-1 ml-4">
          <NuxtLink href="/">Accueil</NuxtLink>
          <NuxtLink href="/about">Présentation</NuxtLink>
          <NuxtLink href="/news">Les Bulletins</NuxtLink>
          <NuxtLink href="/themes">Les Thèmes</NuxtLink>
          <NuxtLink href="/events">Les Manifestations</NuxtLink>
          <NuxtLink href="/blog">Les Publications</NuxtLink>
          <NuxtLink href="/contact">Nous contacter</NuxtLink>
          <NuxtLink href="/admin">Pannel Admin</NuxtLink>
        </div>
      </div>
      <div class="w-full md:w-0.5 h-0.5 md:h-full bg-neutral-300"/>
      <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="flex gap-2 text-base font-bold">
          Suivez nous :
          <NuxtLink href="https://www.facebook.com/Groupe-de-Recherches-Historiques-de-Busnes-1635973926714397" target="_blank" aria-label="Visiter notre page Facebook">
            <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6 h-6">
              <path fill="#1877F2" d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"/>
              <path fill="#ffffff" d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"/>
            </svg>
          </NuxtLink>
        </h1>
        <NuxtLink href="mailto:busneshistoire@gmail.com">busneshistoire@gmail.com</NuxtLink>
        <p>Réalisé avec ❤️ par <NuxtLink href="https://may-baptiste.fr">Baptiste MAY</NuxtLink></p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row justify-between items-center w-full px-8 py-2 border-t gap-2 md:gap-0">
      <p class="text-center md:text-left">
        © {{ new Date().getFullYear() }} Groupe de Recherches Historiques de Busnes
      </p>
      <div class="flex gap-4">
        <NuxtLink href="/legal">Mentions légales</NuxtLink>
        <NuxtLink href="/privacy-policy">Politique de confidentialité</NuxtLink>
      </div>
    </div>
  </footer>
</template>