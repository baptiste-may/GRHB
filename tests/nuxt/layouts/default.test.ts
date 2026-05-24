import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import DefaultLayout from '~/layouts/default.vue';
import { h } from 'vue';

const setup = (slots = {}) => {
  return renderSuspended(DefaultLayout, { slots });
};

describe('default layout', () => {
  it('should render the header, footer and slot content when the layout is used', async () => {
    await setup({
      default: () => h('div', { 'data-testid': 'test-content' }, 'Main Content')
    });

    // We can't easily check for components by name in Testing Library, 
    // but we can check for their content or roles.
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header usually has banner role
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer usually has contentinfo role
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
});
