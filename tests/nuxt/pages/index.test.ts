import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import IndexPage from '~/pages/index.vue';
import { ref } from 'vue';

const { mockUseFetch } = vi.hoisted(() => ({
  mockUseFetch: vi.fn()
}));

mockNuxtImport('useFetch', () => mockUseFetch);

const setup = (data: unknown = null) => {
  mockUseFetch.mockReturnValue({ data: ref(data) });
  return renderSuspended(IndexPage);
};

describe('index.vue', () => {
  it('should render the latest posts correctly when the component is mounted', async () => {
    const posts = [
      { id: 1, title: 'Post 1', content: 'Content 1', slug: 'post-1', path: '/blog', updatedAt: new Date() },
      { id: 2, title: 'Post 2', content: 'Content 2', slug: 'post-2', path: '/blog', updatedAt: new Date() }
    ];
    
    await setup(posts);

    expect(screen.getByText('Groupe de Recherches Historiques de Busnes')).toBeInTheDocument();
    expect(screen.getByText('Derniers posts')).toBeInTheDocument();
    
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
    
    // Check if we have links to these posts
    const links = screen.getAllByRole('link', { name: /Voir le post/i });
    expect(links).toHaveLength(2);
  });
});
