import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import Header from '~/components/ui/Header.vue';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ path: '/' })
}));

mockNuxtImport('useRoute', () => mockRoute);

describe('Header.vue', () => {
  it('should render the desktop menu correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(Header);

    expect(wrapper.text()).toContain('Accueil');
    expect(wrapper.text()).toContain('Présentation');
    expect(wrapper.text()).toContain('Bulletins');
  });

  it('should render the mobile menu correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(Header);

    const menuButton = wrapper.find('button[aria-label="Ouvrir le menu"]');
    expect(menuButton.exists()).toBe(true);
  });

  it('should render the sidebar when the menu button is clicked', async () => {
    const wrapper = await mountSuspended(Header);
    
    const menuButton = wrapper.find('button[aria-label="Ouvrir le menu"]');
    await menuButton.trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
  });
});
