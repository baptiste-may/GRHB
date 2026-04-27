import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import ContactPage from '~/pages/contact.vue';

describe('contact.vue', () => {
  it('should render the contact form correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(ContactPage);

    expect(wrapper.text()).toContain('Nous Contacter');
    expect(wrapper.find('input[id="name-input"]').exists()).toBe(true);
    expect(wrapper.find('input[id="email-input"]').exists()).toBe(true);
    expect(wrapper.find('textarea[id="content-input"]').exists()).toBe(true);
    expect((wrapper.find('button[type="submit"]').element as HTMLButtonElement).disabled).toBe(true);
  });

  it('should render the submit button as enabled when the form is valid', async () => {
    const wrapper = await mountSuspended(ContactPage);

    await wrapper.find('#name-input').setValue('John Doe');
    await wrapper.find('#email-input').setValue('john@example.com');
    await wrapper.find('#subject-input').setValue('Hello');
    await wrapper.find('#content-input').setValue('Message content');

    expect((wrapper.find('button[type="submit"]').element as HTMLButtonElement).disabled).toBe(false);
  });

  it('should render a call to $fetch when the form is submitted', async () => {
    const mockFetch = vi.fn().mockResolvedValue({});
    // @ts-expect-error: Mocking global $fetch
    globalThis.$fetch = mockFetch;
    window.alert = vi.fn();

    const wrapper = await mountSuspended(ContactPage);

    await wrapper.find('#name-input').setValue('John Doe');
    await wrapper.find('#email-input').setValue('john@example.com');
    await wrapper.find('#subject-input').setValue('Hello');
    await wrapper.find('#content-input').setValue('Message content');

    await wrapper.find('form').trigger('submit');

    expect(mockFetch).toHaveBeenCalledWith('/api/sendMail', expect.objectContaining({
      method: 'POST',
      body: expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com'
      })
    }));
  });
});
