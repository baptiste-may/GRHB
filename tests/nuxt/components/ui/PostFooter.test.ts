import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import PostFooter from '~/components/ui/PostFooter.vue';
import type { Post } from '@prisma/client';

const setup = (post: Post) => {
  return renderSuspended(PostFooter, {
    props: {
      post
    }
  });
};

describe('PostFooter.vue', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    content: 'Content',
    author: 'Author Name',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    folderId: '1',
  } as Post;

  it('should render the published date and author when the post is provided', async () => {
    await setup(mockPost);

    expect(screen.getByText(/Publié le/i)).toBeInTheDocument();
    expect(screen.getByText(/janvier 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Author Name/i)).toBeInTheDocument();
  });

  it('should render the modified date when it is different from the published date', async () => {
    const modifiedPost = {
      ...mockPost,
      updatedAt: new Date('2023-02-01')
    } as Post;

    await setup(modifiedPost);

    expect(screen.getByText(/modifié le/i)).toBeInTheDocument();
    expect(screen.getByText(/février 2023/i)).toBeInTheDocument();
  });
});
