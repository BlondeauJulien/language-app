import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainHeader from './shared/components/Header/MainHeader';
import Home from './home/pages/Home';
import Footer from './shared/components/UIElements/Footer';
import Modal from './shared/components/UIElements/Modal';
import AuthForm from './Auth/components/AuthForm';
import UserProfile from './user/pages/UserProfile';
import Search from './search/pages/Search';

function App() {
  const showAuthForm = false;

  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/search' component={Search} />
        <Footer />
        { showAuthForm && (<Modal>
          <AuthForm />
        </Modal>)}
      </div>
    </Router>
  );
}

export default App;
