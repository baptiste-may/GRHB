import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import PrivacyPage from '~/pages/privacy-policy.vue';
import { ref } from 'vue';

const { mockUseAsyncData } = vi.hoisted(() => ({
  mockUseAsyncData: vi.fn()
}));

mockNuxtImport('useAsyncData', () => mockUseAsyncData);

describe('privacy-policy.vue', () => {
  it('should render content when data is available', async () => {
    const pageData = {
      title: 'Politique de confidentialité',
      description: 'Privacy description',
      body: { type: 'root', children: [] }
    };
    mockUseAsyncData.mockReturnValue({ data: ref(pageData) });

    const wrapper = await mountSuspended(PrivacyPage);

    expect(wrapper.findComponent({ name: 'ContentRenderer' }).exists()).toBe(true);
  });
});
