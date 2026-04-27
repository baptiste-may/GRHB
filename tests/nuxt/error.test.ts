import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import ErrorPage from '~/error.vue';
import type { NuxtError } from '#app';

const { mockClearError } = vi.hoisted(() => ({
  mockClearError: vi.fn()
}));

mockNuxtImport('clearError', () => mockClearError);
// Also stub it globally just in case
vi.stubGlobal('clearError', mockClearError);

describe('error.vue', () => {
  it('should render the 404 error message correctly', async () => {
    const error = { statusCode: 404, statusMessage: 'Page not found' } as NuxtError;
    const wrapper = await mountSuspended(ErrorPage, {
      props: { error }
    });

    expect(wrapper.text()).toContain("Cette page n'existe pas !");
  });

  it('should render a generic error message for non-404 errors', async () => {
    const error = { statusCode: 500, statusMessage: 'Internal Server Error' } as NuxtError;
    const wrapper = await mountSuspended(ErrorPage, {
      props: { error }
    });

    expect(wrapper.text()).toContain("Une erreur est survenue");
    expect(wrapper.text()).toContain("Internal Server Error");
  });

  it('should render a call to clearError when the action button is clicked', async () => {
    const error = { statusCode: 404, message: 'Page not found' } as NuxtError;
    const wrapper = await mountSuspended(ErrorPage, {
      props: { error },
      global: {
        stubs: {
          NuxtLayout: { template: '<div><slot /></div>' },
          UiContainer: { template: '<div><slot /></div>' }
        }
      }
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    
    expect(mockClearError).toHaveBeenCalledWith({ redirect: '/' });
  });
});
