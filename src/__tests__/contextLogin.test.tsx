import { act, renderHook } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { LoginProvider, useLogin } from '../context/loginContext';

describe('useLogin', () => {
  test('throws an error when not used within a LoginProvider', () => {
    //  используем хук в render вне контекста
    const { result } = renderHook(() => useLogin());

    expect(() => {
      expect(!result.current.login).toThrow(
        'useLanguage must be used within a LanguageProvider'
      );
    }).toThrow();
  });

  test('returns the correct context value when used within a LoginProvider', () => {
    // используем хук в render внутри контекста
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => <LoginProvider>{children}</LoginProvider>,
    });

    // возвращает корректное значение из контекста
    expect(result.current).toEqual({
      login: false,
      setLogin: expect.any(Function),
    });
  });

  test('returns updated context value when setLogin is called', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => <LoginProvider>{children}</LoginProvider>,
    });

    act(() => {
      // Вызываем setLogin для обновления значения
      result.current.setLogin(true);
    });

    //  значение было обновлено
    expect(result.current).toEqual({
      login: true,
      setLogin: expect.any(Function),
    });
  });
});
