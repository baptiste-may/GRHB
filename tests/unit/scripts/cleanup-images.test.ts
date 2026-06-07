// @vitest-environment node
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { cleanup } from '~~/scripts/cleanup-images';
import fs from 'fs/promises';
import prisma from '../../../lib/prisma';
import type { Post } from '@prisma/client';

vi.mock('fs/promises');
vi.mock('../../../lib/prisma', () => ({
  __esModule: true,
  default: {
    post: {
      findMany: vi.fn()
    },
    $disconnect: vi.fn()
  }
}));

describe('cleanup-images.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the deletion of unused images when they are not referenced in posts', async () => {
    // Mock files in uploads directory
    (fs.readdir as Mock).mockResolvedValue(['used.jpg', 'unused.png', '.gitignore']);
    (fs.access as Mock).mockResolvedValue(undefined);

    // Mock database posts
    (prisma.post.findMany as Mock).mockResolvedValue([
      { content: 'Here is an image: /uploads/used.jpg' }
    ] as unknown as Post[]);

    const deletedCount = await cleanup();

    expect(deletedCount).toBe(1);
    expect(fs.unlink).toHaveBeenCalledWith(expect.stringContaining('unused.png'));
    expect(fs.unlink).not.toHaveBeenCalledWith(expect.stringContaining('used.jpg'));
    expect(fs.unlink).not.toHaveBeenCalledWith(expect.stringContaining('.gitignore'));
  });

  it('should render undefined when the target directory is missing', async () => {
    (fs.access as Mock).mockRejectedValue(new Error('Not found'));
    
    const deletedCount = await cleanup();
    
    expect(deletedCount).toBeUndefined();
    expect(fs.readdir).not.toHaveBeenCalled();
  });
});
