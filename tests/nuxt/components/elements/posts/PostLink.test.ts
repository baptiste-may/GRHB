import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import type { Post } from '@prisma/client';
import PostLink from '~/components/elements/posts/PostLink.vue';

describe('PostLink.vue', () => {
  const post = {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    content: 'Test content for the snippet',
    updatedAt: new Date('2023-01-01')
  } as unknown as Post;

  it('should render the post link correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(PostLink, {
      props: { post, href: '/test/test-post' }
    });

    expect(wrapper.text()).toContain('Test Post');
    expect(wrapper.text()).toContain('Test content for the snippet');
    expect(wrapper.text()).toContain('01/01/2023');
    expect(wrapper.find('a').attributes('href')).toBe('/test/test-post');
  });
});
