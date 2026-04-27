import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import type { Folder } from '@prisma/client';
import FolderLink from '~/components/elements/posts/FolderLink.vue';

describe('FolderLink.vue', () => {
  const folder = {
    id: '1',
    name: 'Test Folder',
    slug: 'test-folder',
    updatedAt: new Date('2023-01-01')
  } as unknown as Folder;

  it('should render the folder link correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(FolderLink, {
      props: { folder, href: '/test/test-folder' }
    });

    expect(wrapper.text()).toContain('Test Folder');
    expect(wrapper.text()).toContain('01/01/2023');
    expect(wrapper.find('a').attributes('href')).toBe('/test/test-folder');
  });
});
