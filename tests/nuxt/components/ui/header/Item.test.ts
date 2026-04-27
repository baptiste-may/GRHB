import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import Item from '~/components/ui/header/Item.vue';
import { Home } from 'lucide-vue-next';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ path: '/' })
}));

mockNuxtImport('useRoute', () => mockRoute);

describe('Item.vue', () => {
  it('should render the basic item correctly with a border when the component is mounted', async () => {
    const wrapper = await mountSuspended(Item, {
      props: {
        name: 'Test Item',
        path: 'test',
        icon: Home
      }
    });

    expect(wrapper.text()).toContain('Test Item');
    expect(wrapper.attributes('href')).toBe('/test');
    expect(wrapper.findComponent(Home).exists()).toBe(true);
    expect(wrapper.classes()).toContain('border-l');
  });

  it('should render as a home item without a left border when it is the home item', async () => {
    const wrapper = await mountSuspended(Item, {
      props: {
        name: 'Home',
        path: '',
      }
    });

    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.attributes('aria-label')).toBe('Accueil');
    expect(wrapper.classes()).not.toContain('border-l');
  });

  it('should render the active state and thick stroke when the route matches the path', async () => {
    mockRoute.mockReturnValue({ path: '/blog' });
    
    const wrapper = await mountSuspended(Item, {
      props: {
        name: 'Blog',
        path: 'blog',
        icon: Home
      }
    });

    expect(wrapper.classes()).toContain('text-black');
    expect(wrapper.classes()).toContain('font-bold');
    expect(wrapper.classes()).toContain('underline');

    const icon = wrapper.findComponent(Home);
    expect(icon.attributes('stroke-width')).toBe('2');
  });

  it('should render the inactive state and thin stroke when the route does not match', async () => {
    mockRoute.mockReturnValue({ path: '/other' });

    const wrapper = await mountSuspended(Item, {
      props: {
        name: 'Blog',
        path: 'blog',
        icon: Home
      }
    });

    expect(wrapper.classes()).toContain('text-neutral-800');
    expect(wrapper.classes()).toContain('font-light');
    expect(wrapper.classes()).toContain('no-underline');

    const icon = wrapper.findComponent(Home);
    expect(icon.attributes('stroke-width')).toBe('1');
  });

  it('should render the root path as active when the route is the root path', async () => {
    mockRoute.mockReturnValue({ path: '/' });

    const wrapper = await mountSuspended(Item, {
      props: {
        name: 'Accueil',
        path: '',
      }
    });

    expect(wrapper.classes()).toContain('text-black');
    expect(wrapper.classes()).toContain('font-bold');
  });

  it('should render the sub-paths correctly with partial matching when the route is a sub-path', async () => {
    mockRoute.mockReturnValue({ path: '/blog/my-awesome-post' });

    const wrapper = await mountSuspended(Item, {
      props: {
        name: 'Blog',
        path: 'blog',
        icon: Home
      }
    });

    expect(wrapper.classes()).toContain('text-black');
    expect(wrapper.classes()).toContain('font-bold');
    expect(wrapper.findComponent(Home).attributes('stroke-width')).toBe('2');
  });
});
