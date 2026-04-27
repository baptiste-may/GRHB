import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import IndexPage from '~/pages/index.vue';
import { ref } from 'vue';

const { mockUseFetch } = vi.hoisted(() => ({
  mockUseFetch: vi.fn()
}));

mockNuxtImport('useFetch', () => mockUseFetch);

describe('index.vue', () => {
  it('should render the latest posts correctly when the component is mounted', async () => {
    const posts = [
      { id: 1, title: 'Post 1', content: 'Content 1', slug: 'post-1', path: '/blog', updatedAt: new Date() },
      { id: 2, title: 'Post 2', content: 'Content 2', slug: 'post-2', path: '/blog', updatedAt: new Date() }
    ];
    mockUseFetch.mockReturnValue({ data: ref(posts) });

    const wrapper = await mountSuspended(IndexPage);

    expect(wrapper.text()).toContain('Groupe de Recherches Historiques de Busnes');
    expect(wrapper.text()).toContain('Derniers posts');
    expect(wrapper.findAllComponents({ name: 'ElementsLatestPost' }).length).toBe(2);
    expect(wrapper.text()).toContain('Post 1');
    expect(wrapper.text()).toContain('Post 2');
  });
});
