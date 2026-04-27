import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import ThemesPage from '~/pages/themes/[...slug].vue';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ params: { slug: [] } })
}));

mockNuxtImport('useRoute', () => mockRoute);

describe('themes/[...slug].vue', () => {
  it('should render the ElementsCategoryPage with the themes folder slug when the component is mounted', async () => {
    const wrapper = await mountSuspended(ThemesPage);
    const categoryPage = wrapper.findComponent({ name: 'ElementsCategoryPage' });
    expect(categoryPage.exists()).toBe(true);
    expect(categoryPage.props('folderSlug')).toBe('themes');
  });
});
