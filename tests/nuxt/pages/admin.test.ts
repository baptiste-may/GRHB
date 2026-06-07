import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import AdminPage from '~/pages/admin.vue';

const setup = () => {
  return renderSuspended(AdminPage);
};

describe('admin.vue', () => {
  it('should render the login options with OVHcloud SSO', async () => {
    await setup();

    expect(screen.getByText(/Administration/i)).toBeInTheDocument();
    expect(screen.getByText(/Se connecter avec OVHcloud/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Mot de passe administrateur/i)).not.toBeInTheDocument();
  });
});
