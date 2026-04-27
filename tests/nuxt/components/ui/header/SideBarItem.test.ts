import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import SideBarItem from '~/components/ui/header/SideBarItem.vue';
import { Home } from 'lucide-vue-next';

describe('SideBarItem.vue', () => {
  it('should render correctly and handle clicks when the component is mounted', async () => {
    const wrapper = await mountSuspended(SideBarItem, {
      props: {
        name: 'Home',
        path: '',
        icon: Home,
        pathname: ''
      }
    });

    expect(wrapper.text()).toContain('Home');
    expect(wrapper.classes()).toContain('text-black'); // Active state for path '' and pathname ''
    
    await wrapper.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
