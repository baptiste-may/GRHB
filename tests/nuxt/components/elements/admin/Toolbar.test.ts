import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Toolbar from '~/components/elements/admin/Toolbar.vue';

const setup = (props = {}) => {
  return renderSuspended(Toolbar, {
    props: {
      currentSlugLength: 1,
      isLoading: false,
      ...props
    }
  });
};

describe('Toolbar.vue', () => {
  it('should render the toolbar buttons and handle clicks when the component is mounted', async () => {
    const { emitted } = await setup();

    await fireEvent.click(screen.getByRole('button', { name: /Retour/i }));
    expect(emitted('back')).toBeTruthy();

    await fireEvent.click(screen.getByRole('button', { name: /Nouveau dossier/i }));
    expect(emitted('createFolder')).toBeTruthy();

    await fireEvent.click(screen.getByRole('button', { name: /Nouveau post/i }));
    expect(emitted('createPost')).toBeTruthy();

    await fireEvent.click(screen.getByRole('button', { name: /Se déconnecter/i }));
    expect(emitted('disconnect')).toBeTruthy();
  });

  it('should render the back button as disabled when at the root level', async () => {
    await setup({ currentSlugLength: 0 });
    expect(screen.getByRole('button', { name: /Retour/i })).toBeDisabled();
  });
});
