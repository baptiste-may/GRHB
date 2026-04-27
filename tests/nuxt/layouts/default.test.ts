import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import DefaultLayout from '~/layouts/default.vue';
import { h } from 'vue';

describe('default layout', () => {
  it('should render the header, footer and slot content when the layout is used', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: {
        default: () => h('div', { id: 'test-content' }, 'Main Content')
      }
    });

    expect(wrapper.findComponent({ name: 'UiHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'UiFooter' }).exists()).toBe(true);
    expect(wrapper.find('#test-content').exists()).toBe(true);
  });
});
