import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import SideBarItem from '~/components/ui/header/SideBarItem.vue';
import { Home } from 'lucide-vue-next';

const setup = (props: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return renderSuspended(SideBarItem, { props: props as any });
};

describe('SideBarItem.vue', () => {
  it('should render correctly and handle clicks when the component is mounted', async () => {
    const { emitted } = await setup({
      name: 'Home',
      path: '',
      icon: Home,
      pathname: ''
    });

    const item = screen.getByRole('link', { name: /Home/i });
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass('text-black'); // Active state for path '' and pathname ''
    
    await fireEvent.click(item);
    expect(emitted()).toHaveProperty('close');
  });
});
