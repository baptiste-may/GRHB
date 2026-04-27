import { mountSuspended } from '@nuxt/test-utils/runtime';
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

  it('should render the post title and content correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(LatestPost, {
      props: { post }
    });

    expect(wrapper.text()).toContain('Test Post');

    expect(wrapper.html()).toContain('test');
    expect(wrapper.find('img').attributes('src')).toBe(post.coverImage);
  });

  it('should render the correct href for an internal post when the component is mounted', async () => {
    const wrapper = await mountSuspended(LatestPost, {
      props: { post }
    });

    expect(wrapper.attributes('href')).toBe('/blog/test-post');
  });

  it('should render the correct href and target for an external post when the component is mounted', async () => {
    const externalPost = { ...post, isExternal: true, path: 'https' };
    const wrapper = await mountSuspended(LatestPost, {
      props: { post: externalPost }
    });

    expect(wrapper.attributes('href')).toBe('/https');
    expect(wrapper.attributes('target')).toBe('_blank');
  });

  it('should render the formatted date when the component is mounted', async () => {
    const wrapper = await mountSuspended(LatestPost, {
      props: { post }
    });

    const formattedDate = new Date(post.updatedAt).toLocaleDateString('fr');
    expect(wrapper.text()).toContain(formattedDate);
  });
});
