<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { Markdown } from 'tiptap-markdown'
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading as HeadingIcon, 
  List, ListOrdered, Quote, Undo, Redo, Code, Image as ImageIcon, 
  Link as LinkIcon, Eraser, Minus, Table as TableIcon, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Trash 
} from 'lucide-vue-next'

import type { AnyExtension } from '@tiptap/vue-3'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

interface MarkdownStorage {
  getMarkdown: () => string
}

const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
    Markdown as unknown as AnyExtension,
    Link.configure({
      openOnClick: false,
      autolink: false,
      HTMLAttributes: {
        class: 'underline pointer-events-none',
      },
    }),
    Image.configure(),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    const storage = (editor.storage as unknown as { markdown: MarkdownStorage }).markdown
    emit('update:modelValue', storage.getMarkdown())
  },
  editorProps: {
    handleDOMEvents: {
      click: (view, event) => {
        const target = event.target as HTMLElement;
        if (target.closest("a")) {
          event.preventDefault();
          event.stopPropagation();
          return true;
        }
        return false;
      },
    },
    attributes: {
      class: 'prose prose-p:p-0 prose-p:m-0 prose-sm sm:prose lg:prose-lg xl:prose-2xl p-4 min-h-[300px] max-h-[600px] overflow-y-auto outline-none focus:ring-0',
    },
  },
})

watch(() => props.modelValue, (value) => {
  if (!editor.value) return
  const storage = (editor.value.storage as unknown as { markdown: MarkdownStorage }).markdown
  const isSame = storage.getMarkdown() === value
  if (!isSame) {
    editor.value.commands.setContent(value, { emitUpdate: false })
  }
})

const handleImageUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append("file", file)

  $fetch("/api/upload", {
    method: "POST",
    body: formData,
  })
    .then((data) => {
      const uploadData = data as { url: string };
      if (uploadData.url) {
        editor.value?.chain().focus().setImage({ src: uploadData.url }).run()
      }
    })
    .catch((err) => {
      console.error(err)
      alert("Erreur lors de l'upload de l'image.")
    })
    .finally(() => {
      target.value = ""
    })
}

const buttons = computed(() => {
  if (!editor.value) return []
  
  return [
    { icon: Bold, onClick: () => editor.value?.chain().focus().toggleBold().run(), isActive: editor.value.isActive('bold'), title: 'Gras' },
    { icon: Italic, onClick: () => editor.value?.chain().focus().toggleItalic().run(), isActive: editor.value.isActive('italic'), title: 'Italique' },
    { icon: UnderlineIcon, onClick: () => editor.value?.chain().focus().toggleUnderline().run(), isActive: editor.value.isActive('underline'), title: 'Souligné' },
    { icon: Strikethrough, onClick: () => editor.value?.chain().focus().toggleStrike().run(), isActive: editor.value.isActive('strike'), title: 'Barré' },
    { icon: Eraser, onClick: () => editor.value?.chain().focus().unsetAllMarks().clearNodes().run(), isActive: false, title: 'Effacer la mise en forme' },
    { type: 'separator' },
    { icon: HeadingIcon, onClick: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.value.isActive('heading', { level: 2 }), title: 'Titre' },
    { type: 'separator' },
    { icon: List, onClick: () => editor.value?.chain().focus().toggleBulletList().run(), isActive: editor.value.isActive('bulletList'), title: 'Liste à puces' },
    { icon: ListOrdered, onClick: () => editor.value?.chain().focus().toggleOrderedList().run(), isActive: editor.value.isActive('orderedList'), title: 'Liste ordonnée' },
    { icon: Quote, onClick: () => editor.value?.chain().focus().toggleBlockquote().run(), isActive: editor.value.isActive('blockquote'), title: 'Citation' },
    { icon: Minus, onClick: () => editor.value?.chain().focus().setHorizontalRule().run(), isActive: false, title: 'Ligne horizontale' },
    { 
      icon: TableIcon, 
      onClick: () => {
        if (editor.value?.isActive('table')) {
          editor.value?.chain().focus().deleteTable().run()
        } else {
          editor.value?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
      }, 
      isActive: editor.value.isActive('table'), 
      title: editor.value.isActive('table') ? 'Supprimer le tableau' : 'Insérer un tableau' 
    },
    ...(editor.value.isActive('table') ? [
      { type: 'separator' },
      { icon: ArrowLeft, onClick: () => editor.value?.chain().focus().addColumnBefore().run(), isActive: false, title: 'Ajouter colonne avant', disabled: !editor.value.can().addColumnBefore() },
      { icon: ArrowRight, onClick: () => editor.value?.chain().focus().addColumnAfter().run(), isActive: false, title: 'Ajouter colonne après', disabled: !editor.value.can().addColumnAfter() },
      { icon: Trash, onClick: () => editor.value?.chain().focus().deleteColumn().run(), isActive: false, title: 'Supprimer la colonne', disabled: !editor.value.can().deleteColumn(), class: 'text-red-500' },
      { icon: ArrowUp, onClick: () => editor.value?.chain().focus().addRowBefore().run(), isActive: false, title: 'Ajouter ligne avant', disabled: !editor.value.can().addRowBefore() },
      { icon: ArrowDown, onClick: () => editor.value?.chain().focus().addRowAfter().run(), isActive: false, title: 'Ajouter ligne après', disabled: !editor.value.can().addRowAfter() },
      { icon: Trash, onClick: () => editor.value?.chain().focus().deleteRow().run(), isActive: false, title: 'Supprimer la ligne', disabled: !editor.value.can().deleteRow(), class: 'text-red-500' },
    ] : []),
    { type: 'separator' },
    { 
      icon: LinkIcon, 
      onClick: () => {
        const previousUrl = editor.value?.getAttributes('link').href
        const url = window.prompt("Entrez l'URL du lien", previousUrl)
        if (url === null) return
        if (url === "") {
          editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
          return
        }
        editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      }, 
      isActive: editor.value.isActive('link'), 
      title: 'Lien' 
    },
    { icon: ImageIcon, onClick: () => document.getElementById("tiptap-image-upload")?.click(), isActive: false, title: 'Image' },
    { icon: Code, onClick: () => editor.value?.chain().focus().toggleCodeBlock().run(), isActive: editor.value.isActive('codeBlock'), title: 'Bloc de code' },
    { type: 'separator' },
    { icon: Undo, onClick: () => editor.value?.chain().focus().undo().run(), isActive: false, title: 'Annuler', disabled: !editor.value.can().undo() },
    { icon: Redo, onClick: () => editor.value?.chain().focus().redo().run(), isActive: false, title: 'Rétablir', disabled: !editor.value.can().redo() },
  ]
})
</script>

<template>
  <div class="border border-black rounded-lg overflow-hidden bg-white transition-all">
    <div class="flex flex-wrap gap-1 p-2 border-b border-black bg-neutral-200 sticky top-0 z-10">
      <input
        id="tiptap-image-upload"
        type="file"
        class="hidden"
        accept="image/*"
        @change="handleImageUpload"
      >
      <template v-for="(btn, index) in buttons" :key="index">
        <div v-if="btn.type === 'separator'" class="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          v-else
          :disabled="btn.disabled"
          :title="btn.title"
          class="p-2 rounded transition-colors"
          :class="[
            btn.isActive ? 'bg-neutral-300 text-blue-600' : 'text-black hover:bg-gray-200 hover:text-gray-900',
            btn.disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
            btn.class
          ]"
          @click.prevent="btn.onClick"
        >
          <component :is="btn.icon" :size="18" />
        </button>
      </template>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
/* Tiptap specific styles */
.prose table {
  @apply border-collapse table-auto w-full;
}
.prose th, .prose td {
  @apply border border-gray-300 p-2;
}
.prose .selectedCell:after {
  @apply bg-blue-100/30;
}
</style>
