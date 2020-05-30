import React from 'react';
import { Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../../App';
import Home from '../pages/Home';
import CourseState from '../../context/course/CourseState';
import AuthState from '../../context/auth/AuthState';
import {render, fireEvent} from '@testing-library/react';


describe("home", () => {
  
  it('Should find element', () => {
    const history = createMemoryHistory()
    const { getByRole } = render(
      <Router history={history}>
        <AuthState>
          <CourseState>
            <App>
              <Home />
            </App>
          </CourseState>
        </AuthState>
      </Router>
    );

    const x = getByRole('button', {name: /create/i});  
    console.log(x)
  })
})