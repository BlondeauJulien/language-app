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

it('Should find see all course button and on click switch to search', () => { 
  const { getByText} = renderHome();
  
  const advancedLink = getByText(/see all/i);
  expect(advancedLink.innerHTML).toMatch(/see all course/i);
  
  fireEvent.click(advancedLink) ;
  
  expect(getByText(/Created by/i).innerHTML).toMatch('Created by');
})