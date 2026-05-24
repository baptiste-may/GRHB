import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import ErrorPage from '~/error.vue';
import type { NuxtError } from '#app';

const { mockClearError } = vi.hoisted(() => ({
  mockClearError: vi.fn()
}));

mockNuxtImport('clearError', () => mockClearError);
// Also stub it globally just in case
vi.stubGlobal('clearError', mockClearError);

const setup = (error: NuxtError) => {
  return renderSuspended(ErrorPage, {
    props: { error },
    global: {
      stubs: {
        NuxtLayout: { template: '<div><slot /></div>' },
        UiContainer: { template: '<div><slot /></div>' }
      }
    }
  });
};

describe('error.vue', () => {
  it('should render the 404 error message correctly', async () => {
    const error = { statusCode: 404, statusMessage: 'Page not found' } as NuxtError;
    await setup(error);

    expect(screen.getByText(/Cette page n'existe pas !/i)).toBeInTheDocument();
  });

  it('should render a generic error message for non-404 errors', async () => {
    const error = { statusCode: 500, statusMessage: 'Internal Server Error' } as NuxtError;
    await setup(error);

    expect(screen.getByText(/Une erreur est survenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();
  });

  it('should render a call to clearError when the action button is clicked', async () => {
    const error = { statusCode: 404, message: 'Page not found' } as NuxtError;
    await setup(error);
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    
    expect(mockClearError).toHaveBeenCalledWith({ redirect: '/' });
  });
});
