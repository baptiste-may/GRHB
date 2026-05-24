import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import AdminPage from '~/pages/admin.vue';

const setup = () => {
  return renderSuspended(AdminPage);
};

describe('admin.vue', () => {
  it('should render the login form when the user is not authenticated', async () => {
    await setup();

    expect(screen.getByText(/Le mot de passe est requis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe administrateur/i)).toHaveAttribute('type', 'password');
  });

  it('should render the password as plain text when the eye icon is clicked', async () => {
    await setup();
    
    const passwordInput = screen.getByLabelText(/Mot de passe administrateur/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    const eyeButton = screen.getByRole('button', { name: /Afficher le mot de passe/i });
    await fireEvent.click(eyeButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
