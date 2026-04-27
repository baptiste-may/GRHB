import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import BlogPage from '~/pages/blog/[...slug].vue';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ params: { slug: ['test-post'] } })
}));

mockNuxtImport('useRoute', () => mockRoute);

describe('blog/[...slug].vue', () => {
  it('should render the ElementsCategoryPage with the blog folder slug when the component is mounted', async () => {
    const wrapper = await mountSuspended(BlogPage);
    
    const categoryPage = wrapper.findComponent({ name: 'ElementsCategoryPage' });
    expect(categoryPage.exists()).toBe(true);
    expect(categoryPage.props('folderSlug')).toBe('blog');
  });
});
