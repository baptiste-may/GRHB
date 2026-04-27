import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import App from '~/app.vue';

describe('app.vue', () => {
  it('should render correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(App);
    expect(wrapper.exists()).toBe(true);
  });
});
