import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import type { Folder } from '@prisma/client';
import FolderRow from '~/components/elements/admin/FolderRow.vue';

const setup = (props = {}) => {
  const folder = {
    id: '1',
    name: 'Admin Folder',
    updatedAt: new Date('2023-01-01')
  } as unknown as Folder;

  return renderSuspended(FolderRow, {
    props: { folder, isRoot: false, ...props }
  });
};

describe('FolderRow.vue', () => {
  it('should render folder information and handle actions when the component is mounted', async () => {
    const { emitted } = await setup();

    expect(screen.getByText('Admin Folder')).toBeInTheDocument();
    expect(screen.getByText(/01\/01\/2023/i)).toBeInTheDocument();

    await fireEvent.click(screen.getByText('Admin Folder'));
    expect(emitted('open')).toBeTruthy();

    await fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));
    expect(emitted('edit')).toBeTruthy();

    await fireEvent.click(screen.getByRole('button', { name: /Supprimer/i }));
    expect(emitted('delete')).toBeTruthy();
  });

  it('should not render edit or delete buttons when at the root level', async () => {
    await setup({ isRoot: true });
    
    expect(screen.getByRole('button', { name: /Ouvrir/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Modifier/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Supprimer/i })).not.toBeInTheDocument();
  });
});
