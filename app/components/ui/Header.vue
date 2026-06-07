<script setup lang="ts">
import {
  BalloonIcon,
  type LucideIcon,
  NewspaperIcon,
  Menu,
  PaletteIcon,
  RssIcon,
  UserPenIcon,
  UsersIcon
} from "lucide-vue-next";

const menu: {
  name: string;
  path: string;
  icon?: LucideIcon;
}[] = [
  {
    name: "Accueil",
    path: ""
  },
  {
    name: "Présentation",
    path: "about",
    icon: UsersIcon
  },
  {
    name: "Bulletins",
    path: "news",
    icon: NewspaperIcon
  },
  {
    name: "Thèmes",
    path: "themes",
    icon: PaletteIcon
  },
  {
    name: "Manifestations",
    path: "events",
    icon: BalloonIcon
  },
  {
    name: "Publications",
    path: "blog",
    icon: RssIcon
  },
  {
    name: "Nous Contacter",
    path: "contact",
    icon: UserPenIcon
  }
];

const sideBarOpen = ref(false);
</script>

<template>
  <header class="relative flex justify-center w-full h-18 bg-neutral-100">
    <div class="hidden sm:flex items-center justify-between w-full h-full max-w-7xl">
      <UiHeaderItem v-for="item in menu" :key="item.path" :name="item.name" :path="item.path" :icon="item.icon"/>
    </div>
    <div class="grid sm:hidden grid-cols-2 items-center justify-between w-full h-full max-w-7xl">
      <UiHeaderItem
name="Accueil" path="" class="pl-8" :style="{
        justifyContent: 'start'
      }"/>
      <button
class="flex items-center justify-end pr-8 h-full hover:bg-neutral-200 transition-all"
              aria-label="Ouvrir le menu" @click="sideBarOpen = true">
        <Menu/>
      </button>
    </div>
    <UiHeaderSideBar :open="sideBarOpen" :on-close="() => sideBarOpen = false" :menu="menu"/>
  </header>
</template>