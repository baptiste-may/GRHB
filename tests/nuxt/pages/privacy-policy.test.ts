import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import PrivacyPage from '~/pages/privacy-policy.vue';
import { ref } from 'vue';

const { mockUseAsyncData } = vi.hoisted(() => ({
  mockUseAsyncData: vi.fn()
}));

mockNuxtImport('useAsyncData', () => mockUseAsyncData);

const setup = (data: unknown = null) => {
  mockUseAsyncData.mockReturnValue({ data: ref(data) });
  return renderSuspended(PrivacyPage);
};

describe('privacy-policy.vue', () => {
  it('should render content when data is available', async () => {
    const pageData = {
      title: 'Politique de confidentialité',
      description: 'Privacy description',
      body: { type: 'root', children: [{ type: 'element', tag: 'p', children: [{ type: 'text', value: 'Privacy Content' }] }] }
    };
    
    await setup(pageData);

    expect(screen.getByText('Privacy Content')).toBeInTheDocument();
  });
});
