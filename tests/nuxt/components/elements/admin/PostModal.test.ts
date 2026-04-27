import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import PostModal from '~/components/elements/admin/PostModal.vue';

describe('PostModal.vue', () => {
  it('should render the post data and handle submission when the modal is open', async () => {
    const postData = { title: 'Title', content: 'Content', author: 'Author' };
    const wrapper = await mountSuspended(PostModal, {
      props: {
        open: true,
        postData
      },
      attachTo: document.body
    });

    const titleInput = document.body.querySelector('input[placeholder="Titre du post"]') as HTMLInputElement;
    expect(titleInput).toBeTruthy();
    expect(titleInput.value).toBe('Title');
    
    const form = document.body.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    
    expect(wrapper.emitted('submit')?.[0]).toEqual([postData]);
    wrapper.unmount();
  });
});
