import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue';

const mockSlugs = [
  { name: 'Home', path: '/', folderId: null },
  { name: 'Blog', path: '/blog', folderId: '1' },
  { name: 'Post', path: '/blog/post', folderId: '2' },
];

const setup = (props = {}) => renderSuspended(Breadcrumbs, {
  props: {
    slugs: mockSlugs,
    ...props
  }
});

describe('Breadcrumbs.vue', () => {
  it('should render the breadcrumbs correctly when the slugs are provided', async () => {
    await setup();

    expect(screen.getByRole('navigation', { name: /Fil d'Ariane/i })).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    expect(links[0]).toHaveTextContent('Home');
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[0]).toHaveClass('text-neutral-500');

    expect(links[1]).toHaveTextContent('Blog');
    expect(links[1]).toHaveAttribute('href', '/blog');

    expect(links[2]).toHaveTextContent('Post');
    expect(links[2]).toHaveAttribute('href', '/blog/post');
    expect(links[2]).toHaveClass('font-bold');
    expect(links[2]).toHaveAttribute('aria-current', 'page');
  });

  it('should render separators between items when multiple breadcrumbs are provided except for the first one', async () => {
    await setup();

    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(2);
  });
});
