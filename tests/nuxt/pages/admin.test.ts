import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import AdminPage from '~/pages/admin.vue';

describe('admin.vue', () => {
  it('should render the login form when the user is not authenticated', async () => {
    const wrapper = await mountSuspended(AdminPage);

    expect(wrapper.text()).toContain('Le mot de passe est requis');
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('should render the password as plain text when the eye icon is clicked', async () => {
    const wrapper = await mountSuspended(AdminPage);
    
    const passwordInput = wrapper.find('input');
    expect(passwordInput.attributes('type')).toBe('password');
    
    const eyeButton = wrapper.find('button[type="button"]');
    await eyeButton.trigger('click');
    
    expect(wrapper.find('input').attributes('type')).toBe('text');
  });
});
