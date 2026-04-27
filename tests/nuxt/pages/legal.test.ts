import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import LegalPage from '~/pages/legal.vue';
import { ref } from 'vue';

const { mockUseAsyncData } = vi.hoisted(() => ({
  mockUseAsyncData: vi.fn()
}));

mockNuxtImport('useAsyncData', () => mockUseAsyncData);

describe('legal.vue', () => {
  it('should render content when data is available', async () => {
    const pageData = {
      title: 'Mentions Légales',
      description: 'Legal description',
      body: { type: 'root', children: [] }
    };
    mockUseAsyncData.mockReturnValue({ data: ref(pageData) });

    const wrapper = await mountSuspended(LegalPage);

    expect(wrapper.findComponent({ name: 'ContentRenderer' }).exists()).toBe(true);
  });
});
