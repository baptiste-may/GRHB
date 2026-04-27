import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import Container from '~/components/ui/Container.vue';

describe('Container.vue', () => {
  it('should render the slot content correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(Container, {
      slots: {
        default: () => 'Test Content'
      }
    });

    expect(wrapper.text()).toContain('Test Content');
    expect(wrapper.classes()).toContain('max-w-6xl');
    expect(wrapper.classes()).toContain('mx-auto');
  });
});
