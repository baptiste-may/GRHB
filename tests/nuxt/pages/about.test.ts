import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import AboutPage from '~/pages/about.vue';
import { ref } from 'vue';

const { mockUseFetch } = vi.hoisted(() => ({
  mockUseFetch: vi.fn()
}));

mockNuxtImport('useFetch', () => mockUseFetch);

const setup = (data: Record<string, unknown> | null = null) => {
  mockUseFetch.mockReturnValue({ data: ref(data) });
  return renderSuspended(AboutPage);
};

describe('about.vue', () => {
  it('should render post content when data is available', async () => {
    const data = {
      type: 'folder',
      currentSlug: [],
      posts: [
        { id: 1, title: 'About GRHB', content: 'About content', slug: 'about', updatedAt: new Date() }
      ]
    };
    
    await setup(data);

    expect(screen.getByText('About GRHB')).toBeInTheDocument();
  });

  it('should render an error message when no post is available', async () => {
    await setup(null);

    expect(screen.getByText(/Veuillez contacter l'administrateur du site/i)).toBeInTheDocument();
  });
});
