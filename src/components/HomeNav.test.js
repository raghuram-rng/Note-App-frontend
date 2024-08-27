import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeNav from './HomeNav'; // Adjust the import path as needed

describe('HomeNav Component', () => {
  test('renders the navigation bar with correct elements', () => {
    render(<HomeNav />);

    // Check if the navbar brand is rendered
    expect(screen.getByText('NotesApp')).toBeInTheDocument();

    // Check if the Sign In link is present and has correct attributes
    const signInLink = screen.getByText('Sign In');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/signin');

    // Check if the Sign Up link is present and has correct attributes
    const signUpLink = screen.getByText('Sign Up');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/signup');

    // Check if the toggle button for mobile view is rendered
    const toggleButton = screen.getByRole('button', { name: /Toggle navigation/i });
    expect(toggleButton).toBeInTheDocument();
  });

  test('has correct aria attributes for accessibility', () => {
    render(<HomeNav />);

    // Check if the toggle button has the correct aria attributes
    const toggleButton = screen.getByRole('button', { name: /Toggle navigation/i });
    expect(toggleButton).toHaveAttribute('aria-controls', 'navbarSupportedContent');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });
});
