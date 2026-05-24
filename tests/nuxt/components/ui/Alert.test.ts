import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Alert from '~/components/ui/Alert.vue';

describe('Alert.vue', () => {
  it('should render the slot content correctly when the component is mounted', async () => {
    await renderSuspended(Alert, {
      slots: {
        default: () => 'Test Content'
      }
    });

    const alert = screen.getByText('Test Content');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-red-100');
    expect(alert).toHaveClass('text-red-700');
  });
});
