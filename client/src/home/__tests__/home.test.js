import React from 'react';
import { MemoryRouter} from 'react-router-dom';
import App from '../../App';
import CourseState from '../../context/course/CourseState';
import AuthState from '../../context/auth/AuthState';
import {render, fireEvent} from '@testing-library/react';

const renderHome = () => {
  return render(
    <MemoryRouter  initialEntries={['/']} initialIndex={0}>
      <AuthState>
        <CourseState>
        <App />
        </CourseState>
      </AuthState>
    </MemoryRouter>
  );
}

describe("home component", () => {
  it('Quick search input should start empty and change on input', () => { 
    const { getByPlaceholderText } = renderHome();
    
    const quickSearchInput = getByPlaceholderText(/e\.g/i);
    expect(quickSearchInput.value).toBe('');

    fireEvent.change(quickSearchInput, {target: {value: 'test text' } } );
    expect(quickSearchInput.value).toBe('test text');
  })

})