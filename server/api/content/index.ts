import prisma from "~~/lib/prisma";
import type { Folder, Post } from "@prisma/client";

export type BreadcrumbsType = {
  name: string;
  path: string;
  folderId: null | string;
}[];

export type FetchResponse =
  | ({
      type: "post";
      currentBreadcrumbs: BreadcrumbsType;
    } & Post)
  | {
      type: "folder";
      currentSlug: BreadcrumbsType;
      posts: Post[];
      folders: Folder[];
    };

export default defineEventHandler(async () => {
  const folders = await prisma.folder.findMany({
    where: {
      parentId: null,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      folderId: null,
    },
  });

  return {
    type: "folder",
    currentSlug: [],
    folders,
    posts,
  } satisfies FetchResponse;
});
