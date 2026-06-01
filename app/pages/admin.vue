<script setup lang="ts">
import type { Folder, Post } from "@prisma/client";

useSeoMeta({
    title: "GRHB | Administration",
    robots: "noindex, nofollow",
});

const { loggedIn, clear: clearSession } = useUserSession();

const logout = async () => {
    await $fetch("/api/auth/logout", { method: "POST" });
    await clearSession();
};

// Admin Table State
const isLoading = ref(false);
const currentSlug = ref<{ name: string; path: string; folderId: string }[]>([]);
const folders = ref<Folder[]>([]);
const posts = ref<Post[]>([]);

const reloadFoldersAndPosts = async () => {
    isLoading.value = true;
    folders.value = [];
    posts.value = [];

    try {
        const url =
            currentSlug.value.length === 0
                ? "/api/content"
                : `/api/folder/get/${currentSlug.value[currentSlug.value.length - 1]?.folderId}`;

        const data = (await $fetch(url as string)) as unknown as { folders: Folder[], posts: Post[] };

        folders.value = data.folders || [];
        posts.value = data.posts || [];
    } catch (err) {
        console.error(err);
    } finally {
        isLoading.value = false;
    }
};

watch(
    loggedIn,
    (val) => {
        if (val) reloadFoldersAndPosts();
    },
    { immediate: true },
);

watch(
    currentSlug,
    () => {
        if (loggedIn.value) reloadFoldersAndPosts();
    },
    { deep: true },
);

// Modals State
const editOrCreateFolderModalData = ref<null | { name: string; id?: string }>(
    null,
);
const editOrCreatePostModalData = ref<null | {
    title: string;
    content: string;
    author: string;
    id?: string;
}>(null);

const openCreateFolder = () => {
    editOrCreateFolderModalData.value = {
        name: "Nouveau dossier",
        id: undefined,
    };
};

const openEditFolder = (folder: Folder) => {
    editOrCreateFolderModalData.value = { name: folder.name, id: folder.id };
};

const openCreatePost = () => {
    editOrCreatePostModalData.value = {
        title: "Nouveau post",
        content: "",
        author: "GRHB",
        id: undefined,
    };
};

const openEditPost = (post: Post) => {
    editOrCreatePostModalData.value = {
        title: post.title,
        content: post.content,
        author: post.author,
        id: post.id,
    };
};

const deleteFolder = async (folder: Folder) => {
    if (
        !confirm(
            `Vous êtes sur le point de supprimer le dossier "${folder.name}"`,
        )
    )
        return;
    try {
        await $fetch(`/api/folder/delete/${folder.id}`, {
            method: "POST"
        });
        reloadFoldersAndPosts();
    } catch (err) {
        console.error(err);
    }
};

const deletePost = async (post: Post) => {
    if (!confirm(`Vous êtes sur le point de supprimer le post "${post.title}"`))
        return;
    try {
        await $fetch(`/api/post/delete/${post.id}`, {
            method: "POST"
        });
        reloadFoldersAndPosts();
    } catch (err) {
        console.error(err);
    }
};

const goBack = () => {
    if (currentSlug.value.length > 0) {
        currentSlug.value.pop();
    }
};

const openFolder = (folder: Folder) => {
    currentSlug.value.push({
        name: folder.name,
        path:
            (currentSlug.value.length === 0
                ? ""
                : currentSlug.value[currentSlug.value.length - 1]?.path) +
            "/" +
            folder.slug,
        folderId: folder.id,
    });
};

const submitFolderForm = async (name: string) => {
    if (!editOrCreateFolderModalData.value) return;
    const isEdit = !!editOrCreateFolderModalData.value.id;
    const url = isEdit
        ? `/api/folder/edit/${editOrCreateFolderModalData.value.id}`
        : "/api/folder/create";

    try {
        await $fetch(url, {
            method: "POST",
            body: {
                name,
                parentId:
                    currentSlug.value.length === 0
                        ? null
                        : currentSlug.value[currentSlug.value.length - 1]
                              ?.folderId,
            },
        });
        editOrCreateFolderModalData.value = null;
        reloadFoldersAndPosts();
    } catch (err) {
        console.error(err);
    }
};

const submitPostForm = async (form: { title: string; content: string; author: string }) => {
    if (!editOrCreatePostModalData.value) return;
    const isEdit = !!editOrCreatePostModalData.value.id;
    const url = isEdit
        ? `/api/post/edit/${editOrCreatePostModalData.value.id}`
        : "/api/post/create";

    try {
        await $fetch(url, {
            method: "POST",
            body: {
                ...form,
                folderId:
                    currentSlug.value.length === 0
                        ? null
                        : currentSlug.value[currentSlug.value.length - 1]
                              ?.folderId,
            },
        });
        editOrCreatePostModalData.value = null;
        reloadFoldersAndPosts();
    } catch (err) {
        console.error(err);
    }
};
</script>

<template>
    <UiContainer>
        <ElementsAdminLoginForm @login="reloadFoldersAndPosts" />

        <div v-if="loggedIn" class="flex flex-col gap-4">
            <h2 class="flex gap-2 items-center text-2xl font-bold mb-2">
                {{
                    currentSlug.length === 0
                        ? "Racine"
                        : currentSlug[currentSlug.length - 1]?.name
                }}
            </h2>

            <ElementsAdminToolbar
                :current-slug-length="currentSlug.length"
                :is-loading="isLoading"
                @back="goBack"
                @create-folder="openCreateFolder"
                @create-post="openCreatePost"
                @disconnect="logout"
            />

            <div class="flex flex-col gap-4 w-full">
                <!-- Header -->
                <div
                    class="hidden md:grid grid-cols-[auto_30%_20%_20%] gap-4 px-4 py-2 font-bold"
                >
                    <div class="ml-8">Nom</div>
                    <div class="ml-8">Contenu</div>
                    <div class="text-center">Dernière modification</div>
                    <div class="text-right mr-8">Actions</div>
                </div>

                <div
                    v-if="isLoading"
                    class="text-center text-2xl font-bold py-8"
                >
                    Chargement...
                </div>
                <div
                    v-else-if="folders.length === 0 && posts.length === 0"
                    class="text-center text-2xl font-bold py-8"
                >
                    Le dossier est vide !
                </div>

                <template v-else>
                    <!-- Folders -->
                    <ElementsAdminFolderRow
                        v-for="folder in folders"
                        :key="folder.id"
                        :folder="folder"
                        :is-root="currentSlug.length === 0"
                        @open="openFolder"
                        @edit="openEditFolder"
                        @delete="deleteFolder"
                    />

                    <div
                        v-if="folders.length > 0 && posts.length > 0"
                        class="h-px bg-neutral-400 my-2"
                    />

                    <!-- Posts -->
                    <ElementsAdminPostRow
                        v-for="post in posts"
                        :key="post.id"
                        :post="post"
                        :is-root="currentSlug.length === 0"
                        @edit="openEditPost"
                        @delete="deletePost"
                    />
                </template>
            </div>

            <ElementsAdminFolderModal
                :open="!!editOrCreateFolderModalData"
                :folder-data="editOrCreateFolderModalData"
                @close="editOrCreateFolderModalData = null"
                @submit="submitFolderForm"
            />

            <ElementsAdminPostModal
                :open="!!editOrCreatePostModalData"
                :post-data="editOrCreatePostModalData"
                @close="editOrCreatePostModalData = null"
                @submit="submitPostForm"
            />
        </div>
    </UiContainer>
</template>
