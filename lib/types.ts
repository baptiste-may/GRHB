import type { Post, Folder } from "@prisma/client";

export interface UnifiedPost extends Post {
    path: string;
    isExternal: boolean;
    coverImage: string | null;
}

export interface FolderWithChildren extends Folder {
    folders: Folder[];
    posts: Post[];
}
