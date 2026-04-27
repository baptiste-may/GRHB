import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import PostFooter from '~/components/ui/PostFooter.vue';
import type { Post } from '@prisma/client';

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
    const wrapper = await mountSuspended(PostFooter, {
      props: {
        post: mockPost
      }
    });

    expect(wrapper.text()).toContain('Publié le');
    expect(wrapper.text()).toContain('janvier 2023');
    expect(wrapper.text()).toContain('Author Name');
  });

  it('should render the modified date when it is different from the published date', async () => {
    const modifiedPost = {
      ...mockPost,
      updatedAt: new Date('2023-02-01')
    } as Post;

    const wrapper = await mountSuspended(PostFooter, {
      props: {
        post: modifiedPost
      }
    });

    expect(wrapper.text()).toContain('modifié le');
    expect(wrapper.text()).toContain('février 2023');
  });
});
