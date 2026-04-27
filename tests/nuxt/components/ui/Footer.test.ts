import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import Footer from '~/components/ui/Footer.vue';

describe('Footer.vue', () => {
  it('should render the site map links correctly when the component is mounted', async () => {
    const wrapper = await mountSuspended(Footer);
    
    expect(wrapper.text()).toContain('Plan du site');
    expect(wrapper.find('a[href="/"]').text()).toBe('Accueil');
    expect(wrapper.find('a[href="/about"]').text()).toBe('Présentation');
    expect(wrapper.find('a[href="/admin"]').text()).toBe('Pannel Admin');
  });

  it('should render the contact and social links when the component is mounted', async () => {
    const wrapper = await mountSuspended(Footer);
    
    expect(wrapper.text()).toContain('Suivez nous');
    expect(wrapper.find('a[aria-label="Visiter notre page Facebook"]').exists()).toBe(true);
    expect(wrapper.find('a[href="mailto:busneshistoire@gmail.com"]').exists()).toBe(true);
  });

  it('should render the copyright with the current year when the component is mounted', async () => {
    const wrapper = await mountSuspended(Footer);
    const currentYear = new Date().getFullYear().toString();
    
    expect(wrapper.text()).toContain(`© ${currentYear}`);
    expect(wrapper.text()).toContain('Groupe de Recherches Historiques de Busnes');
  });

  it('should render the legal links when the component is mounted', async () => {
    const wrapper = await mountSuspended(Footer);
    
    expect(wrapper.find('a[href="/legal"]').text()).toBe('Mentions légales');
    expect(wrapper.find('a[href="/privacy-policy"]').text()).toBe('Politique de confidentialité');
  });
});
