import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import SideBar from '~/components/ui/header/SideBar.vue';
import { Home } from 'lucide-vue-next';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ path: '/' })
}));

mockNuxtImport('useRoute', () => mockRoute);

const setup = (props: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return renderSuspended(SideBar, { props: props as any });
};

describe('SideBar.vue', () => {
  const menu = [
    { name: 'Accueil', path: '' },
    { name: 'Blog', path: 'blog', icon: Home }
  ];

  it('should not render when open is false', async () => {
    await setup({
      open: false,
      onClose: vi.fn(),
      menu
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render menu items when open is true', async () => {
    await setup({
      open: true,
      onClose: vi.fn(),
      menu
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByRole('dialog').querySelector('svg')).toBeInTheDocument();
  });

  it('should render a call to onClose when the backdrop is clicked', async () => {
    const onClose = vi.fn();
    await setup({
      open: true,
      onClose,
      menu
    });

    await fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should not render a call to onClose when the sidebar content is clicked', async () => {
    const onClose = vi.fn();
    await setup({
      open: true,
      onClose,
      menu
    });

    const content = screen.getByText('Accueil').closest('div');
    if (content) await fireEvent.click(content);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should render a call to onClose when a link is clicked', async () => {
    const onClose = vi.fn();
    await setup({
      open: true,
      onClose,
      menu
    });

    await fireEvent.click(screen.getByRole('link', { name: 'Accueil' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('should render the active classes correctly when the route matches', async () => {
    mockRoute.mockReturnValue({ path: '/blog' });
    await setup({
      open: true,
      onClose: vi.fn(),
      menu
    });

    const blogLink = screen.getByRole('link', { name: /Blog/i });
    expect(blogLink).toHaveClass('text-black');
    expect(blogLink).toHaveClass('font-bold');
  });
});
