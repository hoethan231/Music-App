import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders a button element by default', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Default Button' });
    
    expect(buttonElement).toHaveClass('bg-primary');
    expect(buttonElement).toHaveClass('text-primary-foreground');
    expect(buttonElement).toHaveClass('h-9');
    expect(buttonElement).toHaveClass('px-4');
    expect(buttonElement).toHaveClass('py-2');
  });

  it('supports different variants', () => {
    const variants = [
      { variant: 'destructive', expectedClasses: ['bg-destructive', 'text-destructive-foreground'] },
      { variant: 'outline', expectedClasses: ['border', 'border-input', 'bg-background'] },
      { variant: 'secondary', expectedClasses: ['bg-secondary', 'text-secondary-foreground'] },
      { variant: 'ghost', expectedClasses: ['hover:bg-accent'] },
      { variant: 'link', expectedClasses: ['text-primary', 'underline-offset-4'] }
    ];

    variants.forEach(({ variant, expectedClasses }) => {
      render(<Button variant={variant as 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'default'}>Test Button</Button>);
      const buttonElement = screen.getByRole('button', { name: 'Test Button' });
      
      expectedClasses.forEach(cls => {
        expect(buttonElement).toHaveClass(cls);
      });

      cleanup();
    });
  });

  it('supports different sizes', () => {
    const sizes = [
      { size: 'sm', expectedClasses: ['h-8', 'rounded-md', 'px-3', 'text-xs'] },
      { size: 'lg', expectedClasses: ['h-10', 'rounded-md', 'px-8'] },
      { size: 'icon', expectedClasses: ['h-9', 'w-9'] }
    ];

    sizes.forEach(({ size, expectedClasses }) => {
      render(<Button size={size as 'sm' | 'lg' | 'icon' | 'default'}>Size Test</Button>);
      const buttonElement = screen.getByRole('button', { name: 'Size Test' });
      
      expectedClasses.forEach(cls => {
        expect(buttonElement).toHaveClass(cls);
      });

      cleanup();
    });
  });

  it('supports asChild prop to render as a different component', () => {
    render(<Button asChild>
      <a href="/test">Link Button</a>
    </Button>);

    const linkElement = screen.getByRole('link', { name: 'Link Button' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('bg-primary');
  });

  it('passes through additional props', () => {
    render(<Button 
      type="submit" 
      disabled 
      aria-label="Submit Button"
    >
      Submit
    </Button>);

    const buttonElement = screen.getByRole('button', { name: 'Submit Button' });
    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-test-class">Custom Class Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Custom Class Button' });
    expect(buttonElement).toHaveClass('custom-test-class');
  });
});