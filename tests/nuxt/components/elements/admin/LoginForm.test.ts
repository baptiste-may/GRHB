import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import LoginForm from '~/components/elements/admin/LoginForm.vue';

const setup = () => {
  return renderSuspended(LoginForm);
};

describe('LoginForm.vue', () => {
  it('should render the login form with OVHcloud SSO option', async () => {
    await setup();
    expect(screen.getByText(/Administration/i)).toBeInTheDocument();
    expect(screen.getByText(/Se connecter avec OVHcloud/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Mot de passe administrateur/i)).not.toBeInTheDocument();
  });
});
