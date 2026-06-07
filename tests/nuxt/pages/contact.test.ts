import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import ContactPage from '~/pages/contact.vue';

describe('contact.vue', () => {
  const setup = () => {
    return renderSuspended(ContactPage);
  };

  it('should render the contact form correctly when the component is mounted', async () => {
    await setup();

    expect(screen.getByText(/Nous Contacter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre adresse mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Votre message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Envoyer/i })).toBeDisabled();
  });

  it('should render the submit button as enabled when the form is valid', async () => {
    await setup();

    await fireEvent.update(screen.getByLabelText(/Votre nom/i), 'John Doe');
    await fireEvent.update(screen.getByLabelText(/Votre adresse mail/i), 'john@example.com');
    await fireEvent.update(screen.getByLabelText(/Le sujet/i), 'Hello');
    await fireEvent.update(screen.getByLabelText(/^Votre message/i), 'Message content');

    expect(screen.getByRole('button', { name: /Envoyer/i })).not.toBeDisabled();
  });

  it('should render a call to $fetch when the form is submitted', async () => {
    const mockFetch = vi.fn().mockResolvedValue({});
    // @ts-expect-error: Mocking global $fetch
    globalThis.$fetch = mockFetch;
    window.alert = vi.fn();

    await setup();

    await fireEvent.update(screen.getByLabelText(/Votre nom/i), 'John Doe');
    await fireEvent.update(screen.getByLabelText(/Votre adresse mail/i), 'john@example.com');
    await fireEvent.update(screen.getByLabelText(/Le sujet/i), 'Hello');
    await fireEvent.update(screen.getByLabelText(/^Votre message/i), 'Message content');

    await fireEvent.click(screen.getByRole('button', { name: /Envoyer/i }));

    expect(mockFetch).toHaveBeenCalledWith('/api/sendMail', expect.objectContaining({
      method: 'POST',
      body: expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com'
      })
    }));
  });
});
