import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Modal from '~/components/ui/Modal.vue';
import { h } from 'vue';

const setup = (props: unknown, slots = {}) => {
  return renderSuspended(Modal, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: props as any,
    slots,
    global: {
      stubs: {
        Teleport: true,
        Transition: true
      }
    }
  });
};

describe('Modal.vue', () => {
  it('should not render when open is false', async () => {
    await setup({
      open: false,
      title: 'Test Modal'
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render correctly when open is true', async () => {
    await setup({
      open: true,
      title: 'Test Modal'
    }, {
      default: () => h('div', { 'data-testid': 'modal-content' }, 'Modal Content')
    });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-label', 'Test Modal');
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should render an emitted close event when the backdrop is clicked', async () => {
    const { emitted } = await setup({
      open: true,
      title: 'Test Modal'
    });

    const backdrop = screen.getByRole('dialog');
    await fireEvent.click(backdrop);
    
    expect(emitted()).toHaveProperty('close');
  });

  it('should not render an emitted close event when the modal content is clicked', async () => {
    const { emitted } = await setup({
      open: true,
      title: 'Test Modal'
    });

    const dialog = screen.getByRole('dialog', { name: 'Test Modal' });
    const modalContent = dialog.querySelector('div');
    if (modalContent) await fireEvent.click(modalContent);
    
    expect(emitted('close')).toBeUndefined();
  });

  it('should render an emitted close event when the Escape key is pressed', async () => {
    const { rerender, emitted } = await setup({
      open: false,
      title: 'Test Modal'
    });

    await rerender({ open: true });

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(emitted()).toHaveProperty('close');
  });
});
