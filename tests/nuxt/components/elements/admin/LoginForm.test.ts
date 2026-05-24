import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import LoginForm from '~/components/elements/admin/LoginForm.vue';

const setup = () => {
  return renderSuspended(LoginForm);
};

describe('LoginForm.vue', () => {
  it('should render the login form correctly when the component is mounted', async () => {
    await setup();
    expect(screen.getByText(/Le mot de passe est requis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe administrateur/i)).toHaveAttribute('type', 'password');
  });

  it('should render the password as plain text when the toggle button is clicked', async () => {
    await setup();
    
    const input = screen.getByLabelText(/Mot de passe administrateur/i);
    const toggleBtn = screen.getByRole('button', { name: /Afficher le mot de passe/i });

    expect(input).toHaveAttribute('type', 'password');
    await fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
  });
});
