import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import type { Folder, Post } from '@prisma/client';
import Posts from '~/components/elements/Posts.vue';

const setup = (props = {}) => {
  const breadcrumbs = [
    { name: 'Blog', path: '/blog', folderId: '1' }
  ];
  const folders = [
    { id: '1', name: 'Folder 1', slug: 'folder-1', updatedAt: new Date() }
  ] as unknown as Folder[];
  const posts = [
    { id: '1', title: 'Post 1', slug: 'post-1', content: 'Content 1', updatedAt: new Date() }
  ] as unknown as Post[];

  return renderSuspended(Posts, {
    props: { breadcrumbs, folders, posts, ...props }
  });
};

describe('Posts.vue', () => {
  it('should render folders and posts correctly when they are provided', async () => {
    await setup();

    expect(screen.getByText('Folder 1')).toBeInTheDocument();
    expect(screen.getByText('Post 1')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Folder 1/i })).toHaveAttribute('href', '/blog/folder-1');
    expect(screen.getByRole('link', { name: /Post 1/i })).toHaveAttribute('href', '/blog/post-1');
  });

  it('should render an empty message when there are no folders or posts', async () => {
    await setup({ folders: [], posts: [] });

    expect(screen.getByText('Ce dossier est vide')).toBeInTheDocument();
  });

  it('should render folders and posts sorted by date when they are provided', async () => {
    const foldersWithDates = [
      { id: '1', name: 'Old Folder', slug: 'old', updatedAt: new Date('2020-01-01') },
      { id: '2', name: 'New Folder', slug: 'new', updatedAt: new Date('2023-01-01') }
    ] as unknown as Folder[];
    
    await setup({ folders: foldersWithDates, posts: [] });

    // Match links that are specifically for folders (not breadcrumbs)
    const newFolderLink = screen.getByRole('link', { name: /New Folder/i });
    const oldFolderLink = screen.getByRole('link', { name: /Old Folder/i });
    
    const allLinks = screen.getAllByRole('link');
    const folderLinkIndices = [
      allLinks.indexOf(newFolderLink),
      allLinks.indexOf(oldFolderLink)
    ];
    
    const index0 = folderLinkIndices[0];
    const index1 = folderLinkIndices[1];
    if (index0 !== undefined && index1 !== undefined) {
      expect(index0).toBeLessThan(index1);
    }
  });
});
