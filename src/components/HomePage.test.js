import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

describe('HomePage Component', () => {
  test('renders HomeNav component', () => {
    // Render the HomePage component
    render(<HomePage />);

    // Check if the HomeNav component is rendered
    expect(screen.getByText('NotesApp')).toBeInTheDocument();
  });

  test('renders the welcome message and links', () => {
    render(<HomePage />);

    // Check if the welcome message is rendered
    expect(screen.getByText('Welcome to the Notes App !!')).toBeInTheDocument();

    // Check if the instruction text is rendered
    expect(screen.getByText('Please Sign In or Sign Up to continue.')).toBeInTheDocument();

    // Check if the Sign In link is present and has correct attributes
    const signInLink = screen.getByText('SignIn');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/signin');

    // Check if the Sign Up link is present and has correct attributes
    const signUpLink = screen.getByText('SignUp');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/signup');
  });
});
