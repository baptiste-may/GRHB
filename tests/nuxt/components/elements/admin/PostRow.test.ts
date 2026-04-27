import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import type { Post } from '@prisma/client';
import PostRow from '~/components/elements/admin/PostRow.vue';

describe('PostRow.vue', () => {
  const post = {
    id: '1',
    title: 'Admin Post',
    content: 'Admin content snippet',
    updatedAt: new Date('2023-01-01')
  } as unknown as Post;

  it('should render post information and handle actions when the component is mounted', async () => {
    const wrapper = await mountSuspended(PostRow, {
      props: { post, isRoot: false }
    });

    expect(wrapper.text()).toContain('Admin Post');
    expect(wrapper.text()).toContain('Admin content snippet');

    const buttons = wrapper.findAll('button');
    await buttons[0]!.trigger('click');
    expect(wrapper.emitted('edit')).toBeTruthy();

    await buttons[1]!.trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
  });
});
