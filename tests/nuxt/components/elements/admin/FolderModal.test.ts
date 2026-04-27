import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import FolderModal from '~/components/elements/admin/FolderModal.vue';

describe('FolderModal.vue', () => {
  it('should render the folder data and handle submission when the modal is open', async () => {
    const folderData = { name: 'New Folder' };
    const wrapper = await mountSuspended(FolderModal, {
      props: {
        open: true,
        folderData
      },
      attachTo: document.body
    });

    // Content is teleported to body
    const input = document.body.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('New Folder');

    input.value = 'Updated Folder';
    input.dispatchEvent(new Event('input'));
    
    const form = document.body.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    
    expect(wrapper.emitted('submit')?.[0]).toEqual(['Updated Folder']);
    wrapper.unmount();
  });
});
