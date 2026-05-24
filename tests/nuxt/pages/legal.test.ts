import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import LegalPage from '~/pages/legal.vue';
import { ref } from 'vue';

const { mockUseAsyncData } = vi.hoisted(() => ({
  mockUseAsyncData: vi.fn()
}));

mockNuxtImport('useAsyncData', () => mockUseAsyncData);

const setup = (data: unknown = null) => {
  mockUseAsyncData.mockReturnValue({ data: ref(data) });
  return renderSuspended(LegalPage);
};

describe('legal.vue', () => {
  it('should render content when data is available', async () => {
    const pageData = {
      title: 'Mentions Légales',
      description: 'Legal description',
      body: { type: 'root', children: [{ type: 'element', tag: 'p', children: [{ type: 'text', value: 'Test Content' }] }] }
    };
    
    await setup(pageData);

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
