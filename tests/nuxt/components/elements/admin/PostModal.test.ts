import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import PostModal from '~/components/elements/admin/PostModal.vue';

const setup = (props = {}) => {
  return renderSuspended(PostModal, {
    props: {
      open: true,
      postData: { title: 'Title', content: 'Content', author: 'Author' },
      ...props
    },
    global: {
      stubs: {
        Teleport: true,
        Transition: true,
        UiTipTapEditor: {
           template: '<textarea :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
           props: ['modelValue']
        }
      }
    }
  });
};

describe('PostModal.vue', () => {
  it('should render the post data and handle submission when the modal is open', async () => {
    const postData = { title: 'Title', content: 'Content', author: 'Author' };
    const { emitted } = await setup({ postData });

    const titleInput = screen.getByPlaceholderText('Titre du post');
    expect(titleInput).toHaveValue('Title');
    
    await fireEvent.click(screen.getByRole('button', { name: /Créer/i }));
    
    expect(emitted('submit')?.[0]).toEqual([postData]);
  });
});
