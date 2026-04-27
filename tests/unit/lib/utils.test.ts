import { describe, it, expect } from 'vitest';
import { createSlug } from '~~/lib/utils';

describe('createSlug', () => {
  it('should render lowercase slugs with dashes when titles have spaces', () => {
    expect(createSlug('Hello World')).toBe('hello-world');
  });

  it('should render slugs without accents when titles have accented characters', () => {
    expect(createSlug('Été à l\'Opéra')).toBe('ete-a-l\'opera');
  });

  it('should render slugs correctly when titles have multiple spaces and special characters', () => {
    expect(createSlug('Test  Space')).toBe('test--space');
  });

  it('should render simplified characters when special characters defined in simpleChars are present', () => {
    expect(createSlug('êëèéàäôö')).toBe('eeeeaaoo');
  });
});
