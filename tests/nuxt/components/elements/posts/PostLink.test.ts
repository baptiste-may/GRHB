import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import type { Post } from '@prisma/client';
import PostLink from '~/components/elements/posts/PostLink.vue';

const setup = (post: Post, href: string) => {
  return renderSuspended(PostLink, {
    props: { post, href }
  });
};

describe('PostLink.vue', () => {
  const post = {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    content: 'Test content for the snippet',
    updatedAt: new Date('2023-01-01')
  } as unknown as Post;

  it('should render the post link correctly when the component is mounted', async () => {
    await setup(post, '/test/test-post');

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText(/Test content for the snippet/i)).toBeInTheDocument();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test/test-post');
  });
});
