import { render, screen, cleanup, act } from '@testing-library/react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { UserContext, UserContextType } from '../../context/authContext';
import { LoginContext } from '../../context/loginContext';
import { IdTokenResult, User } from 'firebase/auth';
import { LanguageProvider } from '../../context/contextLanguage';

describe('Test Layout component', () => {
  test('renders Logout button when login is true', () => {
    // Mock ащк useContext
    const mockUser: User = {
      email: 'test@example.com',
      emailVerified: true,
      isAnonymous: false,
      metadata: { creationTime: '', lastSignInTime: '' },
      providerData: [],
      refreshToken: 'mockRefreshToken',
      tenantId: 'TENANT_PROJECT_ID',
      delete: vi.fn(() => Promise.resolve()),
      getIdToken: vi.fn(() => Promise.resolve('mockIdToken')),
      getIdTokenResult: vi.fn(() => Promise.resolve({} as IdTokenResult)),
      reload: vi.fn(() => Promise.resolve()),
      toJSON: vi.fn(() => ({})),
      displayName: null,
      phoneNumber: null,
      photoURL: null,
      providerId: '',
      uid: '',
    };
    const mockUserContext: UserContextType = {
      user: mockUser,
      setUser: vi.fn(),
    };
    const mockLoginContext = { login: true, setLogin: vi.fn() };

    render(
      <MemoryRouter>
        <LanguageProvider>
          <UserContext.Provider value={mockUserContext}>
            <LoginContext.Provider value={mockLoginContext}>
              <Layout />
            </LoginContext.Provider>
          </UserContext.Provider>
        </LanguageProvider>
      </MemoryRouter>
    );

    const logoutButton = screen.getByText('Sign out');
    expect(logoutButton).toBeTruthy();
  });

  afterEach(() => {
    cleanup();
  });

  test('Сhecked login page', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <Layout />
          </LanguageProvider>
        </MemoryRouter>
      );
    });
    const login = screen.getByTestId('header');
    expect(login).toBeTruthy();
  });
});
