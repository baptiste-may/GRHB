import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import CategoryPage from '~/components/elements/CategoryPage.vue';
import { ref } from 'vue';

const { mockRoute, mockUseFetch, mockCreateError } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ params: { slug: [] } }),
  mockUseFetch: vi.fn(),
  mockCreateError: vi.fn().mockImplementation((err) => err)
}));

mockNuxtImport('useRoute', () => mockRoute);
mockNuxtImport('useFetch', () => mockUseFetch);
mockNuxtImport('createError', () => mockCreateError);

const setup = (fetchResult: Record<string, unknown> = { data: ref(null), error: ref(null) }, props = {}) => {
  mockUseFetch.mockReturnValue(fetchResult);
  return renderSuspended(CategoryPage, {
    props: { folderSlug: 'blog', ...props }
  });
};

describe('CategoryPage.vue', () => {
  it('should throw an error when the fetch operation fails', async () => {
    const fetchError = { statusCode: 404, statusMessage: 'Not Found' };
    
    try {
      await setup({ data: ref(null), error: ref(fetchError) });
    } catch {
      // Expect the error to be thrown or createError to be called
    }
    
    expect(mockCreateError).toHaveBeenCalledWith(expect.objectContaining({
      statusCode: 404,
      statusMessage: 'Not Found',
      fatal: true
    }));
  });

  it('should render the PostComponent when the data type is post', async () => {
    const postData = {
      type: 'post',
      title: 'My Post',
      content: 'Content',
      slug: 'my-post',
      author: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      currentBreadcrumbs: []
    };
    
    await setup({ data: ref(postData), error: ref(null) });

    expect(screen.getByText('My Post')).toBeInTheDocument();
  });

  it('should render the Posts component when the data type is folder', async () => {
    const folderData = {
      type: 'folder',
      currentSlug: [{ name: 'Blog', path: '/blog', folderId: '1' }],
      folders: [],
      posts: []
    };
    
    await setup({ data: ref(folderData), error: ref(null) });

    expect(screen.getByRole('navigation', { name: /Fil d'Ariane/i })).toBeInTheDocument();
  });
});
