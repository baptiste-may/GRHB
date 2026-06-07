import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import type { Post } from '@prisma/client';
import PostRow from '~/components/elements/admin/PostRow.vue';

const setup = (props = {}) => {
  const post = {
    id: '1',
    title: 'Admin Post',
    content: 'Admin content snippet',
    updatedAt: new Date('2023-01-01')
  } as unknown as Post;

  return renderSuspended(PostRow, {
    props: { post, isRoot: false, ...props }
  });
};

describe('PostRow.vue', () => {
  it('should render post information and handle actions when the component is mounted', async () => {
    const { emitted } = await setup();

    expect(screen.getByText('Admin Post')).toBeInTheDocument();
    expect(screen.getByText(/Admin content snippet/i)).toBeInTheDocument();

    await fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));
    expect(emitted('edit')).toBeTruthy();

    await fireEvent.click(screen.getByRole('button', { name: /Supprimer/i }));
    expect(emitted('delete')).toBeTruthy();
  });
});
