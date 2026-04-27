import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import LoginForm from '~/components/elements/admin/LoginForm.vue';

describe('LoginForm.vue', () => {
  it('should render the login form correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(LoginForm);
    expect(wrapper.text()).toContain('Le mot de passe est requis');
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('should render the password as plain text when the toggle button is clicked', async () => {
    const wrapper = await mountSuspended(LoginForm);
    const input = wrapper.find('input');
    const toggleBtn = wrapper.find('button[type="button"]');

    expect(input.attributes('type')).toBe('password');
    await toggleBtn.trigger('click');
    expect(input.attributes('type')).toBe('text');
  });
});
