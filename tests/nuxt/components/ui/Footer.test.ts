import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Footer from '~/components/ui/Footer.vue';

const setup = () => {
  return renderSuspended(Footer);
};

describe('Footer.vue', () => {
  it('should render the site map links correctly when the component is mounted', async () => {
    await setup();
    
    expect(screen.getByText(/Plan du site/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Accueil/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Présentation/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Pannel Admin/i })).toHaveAttribute('href', '/admin');
  });

  it('should render the contact and social links when the component is mounted', async () => {
    await setup();
    
    expect(screen.getByText(/Suivez nous/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Visiter notre page Facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /busneshistoire@gmail.com/i })).toHaveAttribute('href', 'mailto:busneshistoire@gmail.com');
  });

  it('should render the copyright with the current year when the component is mounted', async () => {
    await setup();
    const currentYear = new Date().getFullYear().toString();
    
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    expect(screen.getByText(/Groupe de Recherches Historiques de Busnes/i)).toBeInTheDocument();
  });

  it('should render the legal links when the component is mounted', async () => {
    await setup();
    
    expect(screen.getByRole('link', { name: 'Mentions légales' })).toHaveAttribute('href', '/legal');
    expect(screen.getByRole('link', { name: 'Politique de confidentialité' })).toHaveAttribute('href', '/privacy-policy');
  });
});
