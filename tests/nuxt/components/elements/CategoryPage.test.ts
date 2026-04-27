import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
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

describe('CategoryPage.vue', () => {
  it('should throw an error when the fetch operation fails', async () => {
    const fetchError = { statusCode: 404, statusMessage: 'Not Found' };
    mockUseFetch.mockReturnValue({ data: ref(null), error: ref(fetchError) });

    try {
      await mountSuspended(CategoryPage, {
        props: { folderSlug: 'blog' }
      });
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
      currentBreadcrumbs: []
    };
    mockUseFetch.mockReturnValue({ data: ref(postData), error: ref(null) });

    const wrapper = await mountSuspended(CategoryPage, {
      props: { folderSlug: 'blog' }
    });

    expect(wrapper.findComponent({ name: 'ElementsPostComponent' }).exists()).toBe(true);
  });

  it('should render the Posts component when the data type is folder', async () => {
    const folderData = {
      type: 'folder',
      currentSlug: [{ name: 'Blog', path: 'blog', folderId: '1' }],
      folders: [],
      posts: []
    };
    mockUseFetch.mockReturnValue({ data: ref(folderData), error: ref(null) });

    const wrapper = await mountSuspended(CategoryPage, {
      props: { folderSlug: 'blog' }
    });

    expect(wrapper.findComponent({ name: 'ElementsPosts' }).exists()).toBe(true);
  });
});
