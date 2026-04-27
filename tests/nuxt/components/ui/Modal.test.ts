import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import Modal from '~/components/ui/Modal.vue';
import { nextTick, h } from 'vue';

describe('Modal.vue', () => {
  it('should not render when open is false', async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        open: false,
        title: 'Test Modal'
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    });

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('should render correctly when open is true', async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        open: true,
        title: 'Test Modal'
      },
      slots: {
        default: () => h('div', { id: 'modal-content' }, 'Modal Content')
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    });

    await nextTick();

    const dialog = wrapper.find('[role="dialog"]');
    expect(dialog.exists()).toBe(true);
    expect(dialog.attributes('aria-label')).toBe('Test Modal');
    expect(wrapper.find('#modal-content').exists()).toBe(true);
  });

  it('should render an emitted close event when the backdrop is clicked', async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        open: true,
        title: 'Test Modal'
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    });

    await nextTick();

    const backdrop = wrapper.find('[role="dialog"]');
    await backdrop.trigger('click');
    
    expect(wrapper.emitted()).toHaveProperty('close');
  });

  it('should not render an emitted close event when the modal content is clicked', async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        open: true,
        title: 'Test Modal'
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    });

    await nextTick();

    const modalContent = wrapper.find('[role="dialog"]').find('div');
    await modalContent.trigger('click');
    
    expect(wrapper.emitted('close')).toBeUndefined();
  });

  it('should render an emitted close event when the Escape key is pressed', async () => {
    const wrapper = await mountSuspended(Modal, {
      props: {
        open: false,
        title: 'Test Modal'
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    });

    await wrapper.setProps({ open: true });
    await nextTick();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(wrapper.emitted()).toHaveProperty('close');
  });
});
