import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Container from '~/components/ui/Container.vue';

const setup = (slots = {}) => {
  return renderSuspended(Container, {
    slots
  });
};

describe('Container.vue', () => {
  it('should render the slot content correctly when the component is mounted', async () => {
    await setup({
      default: () => 'Test Content'
    });

    const container = screen.getByText('Test Content');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('max-w-6xl');
    expect(container).toHaveClass('mx-auto');
  });
});
