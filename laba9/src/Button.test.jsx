// src/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button.jsx'; // Явно указали расширение

describe('Button component', () => {
  it('1. Рендерится с текстом', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByTestId('button')).toHaveTextContent('Click me');
  });

  it('2. Вызывает onClick при клике', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
