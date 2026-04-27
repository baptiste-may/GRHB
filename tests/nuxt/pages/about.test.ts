import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import AboutPage from '~/pages/about.vue';
import { ref } from 'vue';

const { mockUseFetch } = vi.hoisted(() => ({
  mockUseFetch: vi.fn()
}));

mockNuxtImport('useFetch', () => mockUseFetch);

describe('about.vue', () => {
  it('should render post content when data is available', async () => {
    const data = {
      type: 'folder',
      currentSlug: [],
      posts: [
        { id: 1, title: 'About GRHB', content: 'About content', slug: 'about', updatedAt: new Date() }
      ]
    };
    mockUseFetch.mockReturnValue({ data: ref(data) });

    const wrapper = await mountSuspended(AboutPage);

    expect(wrapper.findComponent({ name: 'ElementsPostComponent' }).exists()).toBe(true);
    expect(wrapper.text()).toContain('About GRHB');
  });

  it('should render an error message when no post is available', async () => {
    mockUseFetch.mockReturnValue({ data: ref(null) });

    const wrapper = await mountSuspended(AboutPage);

    expect(wrapper.text()).toContain("Veuillez contacter l'administrateur du site");
  });
});
