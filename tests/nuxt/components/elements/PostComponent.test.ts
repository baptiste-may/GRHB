import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import type { Post } from '@prisma/client';
import PostComponent from '~/components/elements/PostComponent.vue';

describe('PostComponent.vue', () => {
  const post = {
    id: '1',
    title: 'Post Title',
    content: 'This is the **post content**.',
    slug: 'post-slug',
    updatedAt: new Date(),
    author: { name: 'Author Name' },
    currentBreadcrumbs: [
      { name: 'Blog', path: '/blog', folderId: '1' }
    ]
  } as unknown as Post & { author: { name: string }, currentBreadcrumbs: { name: string, path: string, folderId: string }[] };

  it('should render the breadcrumbs correctly with the full path when the component is mounted', async () => {
    const wrapper = await mountSuspended(PostComponent, {
      props: { post }
    });

    expect(wrapper.text()).toContain('Blog');
    expect(wrapper.text()).toContain('Post Title');
    
    const breadcrumbs = wrapper.findComponent({ name: 'UiBreadcrumbs' });
    const slugs = breadcrumbs.props('slugs');
    expect(slugs[slugs.length - 1].path).toBe('/blog/post-slug');
  });

  it('should render the post content correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(PostComponent, {
      props: { post }
    });

    expect(wrapper.html()).toContain('Post Title');
    expect(wrapper.html()).toContain('<strong>post content</strong>');
  });

  it('should render the post footer when the component is mounted', async () => {
    const wrapper = await mountSuspended(PostComponent, {
      props: { post }
    });

    expect(wrapper.findComponent({ name: 'UiPostFooter' }).exists()).toBe(true);
  });
});
