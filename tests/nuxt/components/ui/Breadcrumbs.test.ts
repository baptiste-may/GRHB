import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue';

describe('Breadcrumbs.vue', () => {
  const mockSlugs = [
    { name: 'Home', path: '/', folderId: null },
    { name: 'Blog', path: '/blog', folderId: '1' },
    { name: 'Post', path: '/blog/post', folderId: '2' },
  ];

  it('should render the breadcrumbs correctly when the slugs are provided', async () => {
    const wrapper = await mountSuspended(Breadcrumbs, {
      props: {
        slugs: mockSlugs
      }
    });

    expect(wrapper.find('nav[aria-label="Fil d\'Ariane"]').exists()).toBe(true);
    const links = wrapper.findAllComponents({ name: 'NuxtLink' });
    expect(links).toHaveLength(3);

    expect(links[0]?.text()).toBe('Home');
    expect(links[0]?.attributes('href')).toBe('/');
    expect(links[0]?.classes()).toContain('text-neutral-500');

    expect(links[1]?.text()).toBe('Blog');
    expect(links[1]?.attributes('href')).toBe('/blog');

    expect(links[2]?.text()).toBe('Post');
    expect(links[2]?.attributes('href')).toBe('/blog/post');
    expect(links[2]?.classes()).toContain('font-bold');
    expect(links[2]?.attributes('aria-current')).toBe('page');
  });

  it('should render separators between items when multiple breadcrumbs are provided except for the first one', async () => {
    const wrapper = await mountSuspended(Breadcrumbs, {
      props: {
        slugs: mockSlugs
      }
    });

    const separators = wrapper.findAll('.text-neutral-500').filter(w => w.text() === '>');

    expect(separators).toHaveLength(2);
  });
});
