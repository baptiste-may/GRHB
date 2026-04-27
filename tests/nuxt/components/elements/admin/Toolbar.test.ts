import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import Toolbar from '~/components/elements/admin/Toolbar.vue';

describe('Toolbar.vue', () => {
  it('should render the toolbar buttons and handle clicks when the component is mounted', async () => {
    const wrapper = await mountSuspended(Toolbar, {
      props: {
        currentSlugLength: 1,
        isLoading: false
      }
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(3);

    await buttons[0]!.trigger('click');
    expect(wrapper.emitted('back')).toBeTruthy();

    await buttons[1]!.trigger('click');
    expect(wrapper.emitted('createFolder')).toBeTruthy();

    await buttons[2]!.trigger('click');
    expect(wrapper.emitted('createPost')).toBeTruthy();
  });

  it('should render the back button as disabled when at the root level', async () => {
    const wrapper = await mountSuspended(Toolbar, {
      props: {
        currentSlugLength: 0,
        isLoading: false
      }
    });
    expect((wrapper.findAll('button')[0]!.element as HTMLButtonElement).disabled).toBe(true);
  });
});
