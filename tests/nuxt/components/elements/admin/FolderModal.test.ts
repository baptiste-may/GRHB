import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import FolderModal from '~/components/elements/admin/FolderModal.vue';

const setup = (props = {}) => {
  return renderSuspended(FolderModal, {
    props: {
      open: true,
      folderData: { name: 'New Folder' },
      ...props
    },
    global: {
      stubs: {
        Teleport: true,
        Transition: true
      }
    }
  });
};

describe('FolderModal.vue', () => {
  it('should render the folder data and handle submission when the modal is open', async () => {
    const folderData = { name: 'New Folder' };
    const { emitted } = await setup({ folderData });

    const input = screen.getByLabelText(/Nom du dossier/i);
    expect(input).toHaveValue('New Folder');

    await fireEvent.update(input, 'Updated Folder');
    
    // The button text for a new folder (no id in folderData) is "Créer"
    await fireEvent.click(screen.getByRole('button', { name: /Créer/i }));
    
    expect(emitted('submit')?.[0]).toEqual(['Updated Folder']);
  });
});
