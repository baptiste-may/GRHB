import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import type { Post } from '@prisma/client';
import LatestPost from '~/components/elements/LatestPost.vue';

describe('LatestPost.vue', () => {
  const post = {
    id: '1',
    title: 'Test Post',
    content: 'This is a **test** post content.',
    slug: 'test-post',
    path: '/blog',
    coverImage: 'https://example.com/image.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: '1',
    isExternal: false
  } as unknown as Post & { path: string; coverImage: string; isExternal: boolean };

  const setup = (props = {}) => renderSuspended(LatestPost, {
    props: { post, ...props }
  });

  it('should render the post title and content correctly when the component is mounted', async () => {
    await setup();

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText(/post content/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', post.coverImage);
  });

  it('should render the correct href for an internal post when the component is mounted', async () => {
    await setup();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/blog/test-post');
  });

  it('should render the correct href and target for an external post when the component is mounted', async () => {
    const externalPost = { ...post, isExternal: true, path: 'https' };
    await setup({ post: externalPost });

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/https');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should render the formatted date when the component is mounted', async () => {
    await setup();

    const formattedDate = new Date(post.updatedAt).toLocaleDateString('fr');
    expect(screen.getByText(new RegExp(formattedDate))).toBeInTheDocument();
  });
});
