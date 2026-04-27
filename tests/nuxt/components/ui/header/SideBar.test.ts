import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import SideBar from '~/components/ui/header/SideBar.vue';
import { Home } from 'lucide-vue-next';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ path: '/' })
}));

mockNuxtImport('useRoute', () => mockRoute);

describe('SideBar.vue', () => {
  const menu = [
    { name: 'Accueil', path: '' },
    { name: 'Blog', path: 'blog', icon: Home }
  ];

  it('should not render when open is false', async () => {
    const wrapper = await mountSuspended(SideBar, {
      props: {
        open: false,
        onClose: vi.fn(),
        menu
      }
    });
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('should render menu items when open is true', async () => {
    const wrapper = await mountSuspended(SideBar, {
      props: {
        open: true,
        onClose: vi.fn(),
        menu
      }
    });

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Accueil');
    expect(wrapper.text()).toContain('Blog');
    expect(wrapper.findComponent(Home).exists()).toBe(true);
  });

  it('should render a call to onClose when the backdrop is clicked', async () => {
    const onClose = vi.fn();
    const wrapper = await mountSuspended(SideBar, {
      props: {
        open: true,
        onClose,
        menu
      }
    });

    await wrapper.find('[role="dialog"]').trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should not render a call to onClose when the sidebar content is clicked', async () => {
    const onClose = vi.fn();
    const wrapper = await mountSuspended(SideBar, {
      props: {
        open: true,
        onClose,
        menu
      }
    });

    await wrapper.find('.sidebar-content').trigger('click');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should render a call to onClose when a link is clicked', async () => {
    const onClose = vi.fn();
    const wrapper = await mountSuspended(SideBar, {
      props: {
        open: true,
        onClose,
        menu
      }
    });

    await wrapper.find('a').trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should render the active classes correctly when the route matches', async () => {
    mockRoute.mockReturnValue({ path: '/blog' });
    const wrapper = await mountSuspended(SideBar, {
      props: {
        open: true,
        onClose: vi.fn(),
        menu
      }
    });

    const blogLink = wrapper.findAll('a').find(a => a.text().includes('Blog'));
    expect(blogLink?.classes()).toContain('text-black');
    expect(blogLink?.classes()).toContain('font-bold');
  });
});
