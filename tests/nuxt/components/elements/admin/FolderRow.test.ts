import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import type { Folder } from '@prisma/client';
import FolderRow from '~/components/elements/admin/FolderRow.vue';

describe('FolderRow.vue', () => {
  const folder = {
    id: '1',
    name: 'Admin Folder',
    updatedAt: new Date('2023-01-01')
  } as unknown as Folder;

  it('should render folder information and handle actions when the component is mounted', async () => {
    const wrapper = await mountSuspended(FolderRow, {
      props: { folder, isRoot: false }
    });

    expect(wrapper.text()).toContain('Admin Folder');
    expect(wrapper.text()).toContain('01/01/2023');

    await wrapper.trigger('click');
    expect(wrapper.emitted('open')).toBeTruthy();

    const buttons = wrapper.findAll('button');
    // Open, Edit, Delete
    await buttons[1]!.trigger('click');
    expect(wrapper.emitted('edit')).toBeTruthy();

    await buttons[2]!.trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  it('should not render edit or delete buttons when at the root level', async () => {
    const wrapper = await mountSuspended(FolderRow, {
      props: { folder, isRoot: true }
    });
    // Should only have "Ouvrir" button
    expect(wrapper.findAll('button')).toHaveLength(1);
  });
});
