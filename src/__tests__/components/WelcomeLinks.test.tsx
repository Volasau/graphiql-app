import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WelcomeLinks from '../../components/WelcomeLinks/WelcomeLinks';
import { LoginContext, LoginContextType } from '../../context/loginContext';
import { LanguageProvider } from '../../context/contextLanguage';

describe('Test WelcomeLinks Component', () => {
  test('Renders login links when user is not logged in', () => {
    const mockLoginValue: LoginContextType = {
      login: false,
      setLogin: function (): void {
        throw new Error('Function not implemented.');
      },
    };

    render(
      <MemoryRouter>
        <LanguageProvider>
          <LoginContext.Provider value={mockLoginValue}>
            <WelcomeLinks />
          </LoginContext.Provider>
        </LanguageProvider>
      </MemoryRouter>
    );

    const loginLink = screen.getByText('Sign in');
    const registrationLink = screen.getByText('Sign up');

    expect(loginLink).toBeTruthy();
    expect(registrationLink).toBeTruthy();
  });

  test('Renders main page link when user is logged in', () => {
    const mockLoginValue: LoginContextType = {
      login: true,
      setLogin: function (): void {
        throw new Error('Function not implemented.');
      },
    };

    render(
      <MemoryRouter>
        <LanguageProvider>
          <LoginContext.Provider value={mockLoginValue}>
            <WelcomeLinks />
          </LoginContext.Provider>
        </LanguageProvider>
      </MemoryRouter>
    );

    const mainPageLink = screen.getByText('Main Page');
    expect(mainPageLink).toBeTruthy();
  });
});
