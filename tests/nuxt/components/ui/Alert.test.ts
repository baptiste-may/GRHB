import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import Alert from '~/components/ui/Alert.vue';

describe('Alert.vue', () => {
  it('should render the slot content correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(Alert, {
      slots: {
        default: () => 'Test Content'
      }
    });

    expect(wrapper.text()).toContain('Test Content');
    expect(wrapper.classes()).toContain('bg-red-100');
    expect(wrapper.classes()).toContain('text-red-700');
  });
});
