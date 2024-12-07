import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { ReactNode } from 'react';

// Mock the imported components to isolate the test
jest.mock('../components/ui/button.tsx', () => ({
  Button: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => <button {...props}>{children}</button>
}));

jest.mock('../components/ui/flip-words', () => ({
  FlipWords: ({ words }: { words: string[] }) => <span>{words.join(', ')}</span>
}));

jest.mock('../components/ui/hero-highlight', () => ({
  Highlight: ({ children }: { children: ReactNode }) => <span>{children}</span>
}));

jest.mock('../components/ui/tracing-beam', () => ({
  TracingBeam: ({ children }: { children: ReactNode }) => <div>{children}</div>
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => <a {...props}>{children}</a>
}));

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    expect(screen.getByText('Welcome To')).toBeInTheDocument()
    expect(screen.getByText('GROOVEBOX')).toBeInTheDocument()
  })

  it('renders the subheading', () => {
    render(<Home />)
    
    expect(screen.getByText('Your go-to destination for discovering and listening to the latest hits!')).toBeInTheDocument()
  })

  it('renders the genre flip words', () => {
    render(<Home />)
    
    const genres = ['K-pop', 'R&B', 'Jazz', 'Rap', 'Classical', 'Country']
    expect(screen.getByText(genres.join(', '))).toBeInTheDocument()
  })

  it('renders the get started button with correct link', () => {
    render(<Home />)
    
    const getStartedButton = screen.getByText('Get Started!')
    expect(getStartedButton).toBeInTheDocument()
    
    const link = screen.getByRole('link', { name: 'Get Started!' })
    expect(link).toHaveAttribute('href', '/login')
  })
})