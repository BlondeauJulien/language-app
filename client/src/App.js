import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainHeader from './shared/components/Header/MainHeader';
import Home from './home/pages/Home';
import Footer from './shared/components/UIElements/Footer';
import Modal from './shared/components/UIElements/Modal';
import AuthForm from './Auth/components/AuthForm';
import UserProfile from './user/pages/UserProfile';
import Search from './search/pages/Search';
import Course from './course/pages/Course';
import Word from './word/pages/Word';
import Quiz from './quiz/pages/Quiz';

function App() {
  const showAuthForm = false;

  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/course' component={Course} />
        <Route exact path='/word' component={Word} />
        <Route exact path='/quiz' component={Quiz} />
        <Footer />
        { showAuthForm && (<Modal>
          <AuthForm />
        </Modal>)}
      </div>
    </Router>
  );
}

export default App;
