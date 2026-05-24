import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import type { Post } from '@prisma/client';
import PostComponent from '~/components/elements/PostComponent.vue';

describe('PostComponent.vue', () => {
  const post = {
    id: '1',
    title: 'Post Title',
    content: 'This is the **post content**.',
    slug: 'post-slug',
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'Author Name',
    currentBreadcrumbs: [
      { name: 'Blog', path: '/blog', folderId: '1' }
    ]
  } as unknown as Post & { currentBreadcrumbs: { name: string, path: string, folderId: string }[] };

  const setup = (props = {}) => renderSuspended(PostComponent, {
    props: { post, ...props }
  });

  it('should render the breadcrumbs correctly with the full path when the component is mounted', async () => {
    await setup();

    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Post Title')).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    // The breadcrumb link for the post title
    const postBreadcrumb = links.find(l => l.textContent?.trim() === 'Post Title' && l.getAttribute('href')?.includes('post-slug'));
    expect(postBreadcrumb).toBeInTheDocument();
    expect(postBreadcrumb).toHaveAttribute('href', '/blog/post-slug');
  });

  it('should render the post content correctly when the component is mounted', async () => {
    await setup();

    expect(screen.getByText(/post content/i)).toBeInTheDocument();
  });

  it('should render the post footer when the component is mounted', async () => {
    await setup();

    expect(screen.getByText(/Author Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Publié le/i)).toBeInTheDocument();
  });
});
