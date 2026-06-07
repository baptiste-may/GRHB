import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import NewsPage from '~/pages/news/[...slug].vue';
import { ref } from 'vue';

const { mockRoute, mockUseFetch } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ params: { slug: [] } }),
  mockUseFetch: vi.fn()
}));

mockNuxtImport('useRoute', () => mockRoute);
mockNuxtImport('useFetch', () => mockUseFetch);

describe('news/[...slug].vue', () => {
  const setup = () => {
    return renderSuspended(NewsPage);
  };

  it('should render correctly when the component is mounted', async () => {
    const folderData = {
      type: 'folder',
      currentSlug: [{ name: 'News', path: '/news', folderId: '1' }],
      folders: [],
      posts: []
    };
    mockUseFetch.mockReturnValue({ data: ref(folderData), error: ref(null) });

    await setup();
    
    expect(screen.getByRole('navigation', { name: /Fil d'Ariane/i })).toBeInTheDocument();
  });
});
