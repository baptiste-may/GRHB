import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(1),
  author: z.string().min(2).max(100),
  folderId: z.string().cuid().nullable().optional(),
});

export const FolderSchema = z.object({
  name: z.string().min(2).max(100),
  parentId: z.string().cuid().nullable().optional(),
});

export const EmailSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  content: z.string().min(10).max(5000),
  honeypot: z.string().max(0), // Must be empty
});

