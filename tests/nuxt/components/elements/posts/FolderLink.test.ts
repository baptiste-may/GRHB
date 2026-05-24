import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import type { Folder } from '@prisma/client';
import FolderLink from '~/components/elements/posts/FolderLink.vue';

const setup = (props = {}) => {
  const folder = {
    id: '1',
    name: 'Test Folder',
    slug: 'test-folder',
    updatedAt: new Date('2023-01-01')
  } as unknown as Folder;

  return renderSuspended(FolderLink, {
    props: { folder, href: '/test/test-folder', ...props }
  });
};

describe('FolderLink.vue', () => {
  it('should render the folder link correctly when the component is mounted', async () => {
    await setup();

    expect(screen.getByText('Test Folder')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test/test-folder');
  });
});
