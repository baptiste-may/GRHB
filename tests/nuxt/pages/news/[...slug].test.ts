import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import NewsPage from '~/pages/news/[...slug].vue';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ params: { slug: [] } })
}));

mockNuxtImport('useRoute', () => mockRoute);

describe('news/[...slug].vue', () => {
  it('should render the ElementsCategoryPage with the news folder slug when the component is mounted', async () => {
    const wrapper = await mountSuspended(NewsPage);
    const categoryPage = wrapper.findComponent({ name: 'ElementsCategoryPage' });
    expect(categoryPage.exists()).toBe(true);
    expect(categoryPage.props('folderSlug')).toBe('news');
  });
});
