import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders a div with correct default classes', () => {
      render(<Card data-testid="card">Card Content</Card>);
      const cardElement = screen.getByTestId('card');
      
      expect(cardElement).toBeInTheDocument();
      expect(cardElement).toHaveClass('rounded-xl');
      expect(cardElement).toHaveClass('bg-card');
      expect(cardElement).toHaveClass('text-card-foreground');
      expect(cardElement).toHaveClass('shadow');
    });

    it('applies additional className', () => {
      render(<Card className="custom-class" data-testid="card">Card Content</Card>);
      const cardElement = screen.getByTestId('card');
      
      expect(cardElement).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('CardHeader', () => {
    it('renders with correct default classes', () => {
      render(<CardHeader data-testid="card-header">Header Content</CardHeader>);
      const headerElement = screen.getByTestId('card-header');
      
      expect(headerElement).toBeInTheDocument();
      expect(headerElement).toHaveClass('flex');
      expect(headerElement).toHaveClass('flex-col');
      expect(headerElement).toHaveClass('space-y-1.5');
      expect(headerElement).toHaveClass('p-6');
    });

    it('applies additional className', () => {
      render(<CardHeader className="custom-header-class" data-testid="card-header">Header</CardHeader>);
      const headerElement = screen.getByTestId('card-header');
      
      expect(headerElement).toHaveClass('custom-header-class');
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 with correct default classes', () => {
      render(<CardTitle data-testid="card-title">Card Title</CardTitle>);
      const titleElement = screen.getByTestId('card-title');
      
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.tagName).toBe('H3');
      expect(titleElement).toHaveClass('font-semibold');
      expect(titleElement).toHaveClass('leading-none');
      expect(titleElement).toHaveClass('tracking-tight');
    });

    it('applies additional className', () => {
      render(<CardTitle className="custom-title-class">Card Title</CardTitle>);
      const titleElement = screen.getByText('Card Title');
      
      expect(titleElement).toHaveClass('custom-title-class');
    });
  });

  describe('CardDescription', () => {
    it('renders with correct default classes', () => {
      render(<CardDescription data-testid="card-description">Description</CardDescription>);
      const descriptionElement = screen.getByTestId('card-description');
      
      expect(descriptionElement).toBeInTheDocument();
      expect(descriptionElement.tagName).toBe('P');
      expect(descriptionElement).toHaveClass('text-sm');
      expect(descriptionElement).toHaveClass('text-muted-foreground');
    });

    it('applies additional className', () => {
      render(<CardDescription className="custom-description-class">Description</CardDescription>);
      const descriptionElement = screen.getByText('Description');
      
      expect(descriptionElement).toHaveClass('custom-description-class');
    });
  });

  describe('CardContent', () => {
    it('renders with correct default classes', () => {
      render(<CardContent data-testid="card-content">Content</CardContent>);
      const contentElement = screen.getByTestId('card-content');
      
      expect(contentElement).toBeInTheDocument();
      expect(contentElement).toHaveClass('p-6');
      expect(contentElement).toHaveClass('pt-0');
    });

    it('applies additional className', () => {
      render(<CardContent className="custom-content-class">Content</CardContent>);
      const contentElement = screen.getByText('Content');
      
      expect(contentElement).toHaveClass('custom-content-class');
    });
  });

  describe('CardFooter', () => {
    it('renders with correct default classes', () => {
      render(<CardFooter data-testid="card-footer">Footer</CardFooter>);
      const footerElement = screen.getByTestId('card-footer');
      
      expect(footerElement).toBeInTheDocument();
      expect(footerElement).toHaveClass('flex');
      expect(footerElement).toHaveClass('items-center');
      expect(footerElement).toHaveClass('p-6');
      expect(footerElement).toHaveClass('pt-0');
    });

    it('applies additional className', () => {
      render(<CardFooter className="custom-footer-class">Footer</CardFooter>);
      const footerElement = screen.getByText('Footer');
      
      expect(footerElement).toHaveClass('custom-footer-class');
    });
  });

  describe('Card Composition', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });
  });
});