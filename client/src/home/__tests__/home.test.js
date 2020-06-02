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
  
  it('Should find advanced search button and on click switch to search page', () => { 
    const { getByText} = renderHome();
    
    const advanced = getByText(/advanced/i)
    expect(advanced.innerHTML).toMatch('advanced')
    fireEvent.click(advanced) 
    const search = getByText(/Created by/i);
    expect(search.innerHTML).toMatch('Created by')
  })
})