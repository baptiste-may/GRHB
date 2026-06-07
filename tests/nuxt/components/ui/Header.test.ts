import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import Header from '~/components/ui/Header.vue';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ path: '/' })
}));

mockNuxtImport('useRoute', () => mockRoute);

const setup = () => {
  return renderSuspended(Header);
};

describe('Header.vue', () => {
  it('should render the desktop menu correctly when the component is mounted', async () => {
    await setup();

    expect(screen.getAllByText('Accueil')[0]).toBeInTheDocument();
    expect(screen.getByText('Présentation')).toBeInTheDocument();
    expect(screen.getByText('Bulletins')).toBeInTheDocument();
  });

  it('should render the mobile menu correctly when the component is mounted', async () => {
    await setup();

    expect(screen.getByRole('button', { name: /Ouvrir le menu/i })).toBeInTheDocument();
  });

  it('should render the sidebar when the menu button is clicked', async () => {
    await setup();
    
    const menuButton = screen.getByRole('button', { name: /Ouvrir le menu/i });
    await fireEvent.click(menuButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
