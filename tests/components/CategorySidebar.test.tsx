import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CategorySidebar from '../../src/components/CategorySidebar';
import { categories } from '../../src/utils/constants';
import type { Translation } from '../../src/i18n/translations';

// Minimal translation mock
const mockT = {
  categories: { subject: 'Categories' },
} as unknown as Translation;

test('CategorySidebar renders all categories', () => {
  const onCategoryChange = vi.fn();
  render(
    <CategorySidebar
      categories={categories}
      activeCategory="subject"
      onCategoryChange={onCategoryChange}
      t={mockT}
    />
  );

  // All category names should be visible
  categories.forEach((cat) => {
    expect(screen.getByText(cat.name)).toBeTruthy();
  });
});

test('CategorySidebar calls onCategoryChange when a category is clicked', () => {
  const onCategoryChange = vi.fn();
  render(
    <CategorySidebar
      categories={categories}
      activeCategory="subject"
      onCategoryChange={onCategoryChange}
      t={mockT}
    />
  );

  // Click on the "Art Style" button
  const styleButton = screen.getByText('Art Style');
  fireEvent.click(styleButton);

  expect(onCategoryChange).toHaveBeenCalledWith('style');
});

test('CategorySidebar highlights the active category', () => {
  const onCategoryChange = vi.fn();
  render(
    <CategorySidebar
      categories={categories}
      activeCategory="style"
      onCategoryChange={onCategoryChange}
      t={mockT}
    />
  );

  // The active category button should have gradient classes
  const activeButton = screen.getByText('Art Style').closest('button');
  expect(activeButton?.className).toContain('bg-gradient-to-r');
});
