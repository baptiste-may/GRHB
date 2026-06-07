import { renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import Item from '~/components/ui/header/Item.vue';
import { Home } from 'lucide-vue-next';

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn().mockReturnValue({ path: '/' })
}));

mockNuxtImport('useRoute', () => mockRoute);

const setup = (props: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return renderSuspended(Item, { props: props as any });
};

describe('Item.vue', () => {
  it('should render the basic item correctly with a border when the component is mounted', async () => {
    await setup({
      name: 'Test Item',
      path: 'test',
      icon: Home
    });

    const link = screen.getByRole('link', { name: /Test Item/i });
    expect(link).toHaveTextContent('Test Item');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('border-l');
  });

  it('should render as a home item without a left border when it is the home item', async () => {
    await setup({
      name: 'Home',
      path: '',
    });

    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Accueil' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Accueil' })).not.toHaveClass('border-l');
  });

  it('should render the active state and thick stroke when the route matches the path', async () => {
    mockRoute.mockReturnValue({ path: '/blog' });
    
    await setup({
      name: 'Blog',
      path: 'blog',
      icon: Home
    });

    const link = screen.getByRole('link', { name: /Blog/i });
    expect(link).toHaveClass('text-black');
    expect(link).toHaveClass('font-bold');
    expect(link).toHaveClass('underline');

    const icon = link.querySelector('svg');
    expect(icon).toHaveAttribute('stroke-width', '2');
  });

  it('should render the inactive state and thin stroke when the route does not match', async () => {
    mockRoute.mockReturnValue({ path: '/other' });

    await setup({
      name: 'Blog',
      path: 'blog',
      icon: Home
    });

    const link = screen.getByRole('link', { name: /Blog/i });
    expect(link).toHaveClass('text-neutral-800');
    expect(link).toHaveClass('font-light');
    expect(link).toHaveClass('no-underline');

    const icon = link.querySelector('svg');
    expect(icon).toHaveAttribute('stroke-width', '1');
  });

  it('should render the root path as active when the route is the root path', async () => {
    mockRoute.mockReturnValue({ path: '/' });

    await setup({
      name: 'Accueil',
      path: '',
    });

    const link = screen.getByRole('link', { name: 'Accueil' });
    expect(link).toHaveClass('text-black');
    expect(link).toHaveClass('font-bold');
  });

  it('should render the sub-paths correctly with partial matching when the route is a sub-path', async () => {
    mockRoute.mockReturnValue({ path: '/blog/my-awesome-post' });

    await setup({
      name: 'Blog',
      path: 'blog',
      icon: Home
    });

    const link = screen.getByRole('link', { name: /Blog/i });
    expect(link).toHaveClass('text-black');
    expect(link).toHaveClass('font-bold');
    const icon = link.querySelector('svg');
    expect(icon).toHaveAttribute('stroke-width', '2');
  });
});
