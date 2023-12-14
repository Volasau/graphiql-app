import { act, render, screen } from '@testing-library/react';
import { describe, test, assert, vi, expect } from 'vitest';
import { LanguageProvider } from '../../context/contextLanguage';
import AboutCourse from '../../components/AboutCourse/AboutCourse';
import { DataAboutCourse } from '../../utils/data/DataAbout';

describe('AboutCourse component', () => {
  test('renders AboutCourse component with English content', () => {
    render(
      <LanguageProvider>
        <AboutCourse />
      </LanguageProvider>
    );

    assert.isNotNull(screen.getByText('About Course'));
    assert.isNotNull(screen.getByText(DataAboutCourse.en.p1));
    assert.isNotNull(screen.getByText(DataAboutCourse.en.p2));
    assert.isNotNull(screen.getByText(DataAboutCourse.en.p3));
  });
  vi.resetAllMocks();
});

describe('AboutCourse component', () => {
  test('renders AboutCourse component ', () => {
    act(() => {
      render(
        <LanguageProvider>
          <AboutCourse />
        </LanguageProvider>
      );
    });

    const login = screen.getByTestId('about_course');
    expect(login).toBeTruthy();
  });
});
