import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import BlogPage from '~/pages/blog/[...slug].vue';
import { ref } from 'vue';

const { mockRoute, mockUseFetch } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ params: { slug: ['test-post'] } }),
  mockUseFetch: vi.fn()
}));

mockNuxtImport('useRoute', () => mockRoute);
mockNuxtImport('useFetch', () => mockUseFetch);

const setup = (data: Record<string, unknown> | null = null) => {
  mockUseFetch.mockReturnValue({ data: ref(data), error: ref(null) });
  return renderSuspended(BlogPage);
};

describe('blog/[...slug].vue', () => {
  it('should render correctly when the component is mounted', async () => {
    const folderData = {
      type: 'folder',
      currentSlug: [{ name: 'Blog', path: '/blog', folderId: '1' }],
      folders: [],
      posts: []
    };
    
    await setup(folderData);
    
    expect(screen.getByRole('navigation', { name: /Fil d'Ariane/i })).toBeInTheDocument();
  });
});
