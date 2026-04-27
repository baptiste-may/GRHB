import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import type { Folder, Post } from '@prisma/client';
import Posts from '~/components/elements/Posts.vue';

describe('Posts.vue', () => {
  const breadcrumbs = [
    { name: 'Blog', path: 'blog', folderId: '1' }
  ];
  const folders = [
    { id: '1', name: 'Folder 1', slug: 'folder-1', updatedAt: new Date() }
  ] as unknown as Folder[];
  const posts = [
    { id: '1', title: 'Post 1', slug: 'post-1', content: 'Content 1', updatedAt: new Date() }
  ] as unknown as Post[];

  it('should render folders and posts correctly when they are provided', async () => {
    const wrapper = await mountSuspended(Posts, {
      props: { breadcrumbs, folders, posts }
    });

    expect(wrapper.text()).toContain('Folder 1');
    expect(wrapper.text()).toContain('Post 1');

    const links = wrapper.findAll('a');
    const folderLink = links.find(l => l.attributes('href') === '/blog/folder-1');
    const postLink = links.find(l => l.attributes('href') === '/blog/post-1');
    
    expect(folderLink?.exists()).toBe(true);
    expect(postLink?.exists()).toBe(true);
  });

  it('should render an empty message when there are no folders or posts', async () => {
    const wrapper = await mountSuspended(Posts, {
      props: { breadcrumbs, folders: [], posts: [] }
    });

    expect(wrapper.text()).toContain('Ce dossier est vide');
  });

  it('should render folders and posts sorted by date when they are provided', async () => {
    const foldersWithDates = [
      { id: '1', name: 'Old Folder', slug: 'old', updatedAt: new Date('2020-01-01') },
      { id: '2', name: 'New Folder', slug: 'new', updatedAt: new Date('2023-01-01') }
    ] as unknown as Folder[];
    
    const wrapper = await mountSuspended(Posts, {
      props: { breadcrumbs, folders: foldersWithDates, posts: [] }
    });

    const folderLinks = wrapper.findAll('a').filter(l => l.classes().includes('bg-neutral-200'));
    const folderTitles = folderLinks.map(l => l.find('h2').text());
    
    expect(folderTitles[0]).toBe('New Folder');
    expect(folderTitles[1]).toBe('Old Folder');
  });
});
