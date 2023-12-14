import { renderHook, act } from '@testing-library/react';
import { UserProvider, useUser, UserContext } from '../context/authContext';
import { User } from '@firebase/auth';
import { describe, test, expect, vi } from 'vitest';
import { IdTokenResult } from 'firebase/auth';

describe('useUser', () => {
  test('throws an error when not used within a UserProvider', () => {
    const { result } = renderHook(() => useUser());
    result.current.user = null;

    expect(() => {
      expect(result.current.user).toThrow('Error');
    }).toThrow();
  });

  test('returns the correct context value when used within a UserProvider', () => {
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

    const { result } = renderHook(() => useUser(), {
      wrapper: ({ children }) => (
        <UserProvider>
          <UserContext.Provider value={{ user: mockUser, setUser: vi.fn() }}>
            {children}
          </UserContext.Provider>
        </UserProvider>
      ),
    });

    expect(result.current).toEqual({
      user: mockUser,
      setUser: expect.any(Function),
    });
  });

  test('returns updated context value when setUser is called', () => {
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

    const { result } = renderHook(() => useUser(), {
      wrapper: ({ children }) => (
        <UserProvider>
          <UserContext.Provider value={{ user: mockUser, setUser: vi.fn() }}>
            {children}
          </UserContext.Provider>
        </UserProvider>
      ),
    });

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current).toEqual({
      user: mockUser,
      setUser: expect.any(Function),
    });
  });
});
