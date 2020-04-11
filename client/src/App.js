import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainHeader from './shared/components/Header/MainHeader';
import Home from './home/pages/Home';
import Footer from './shared/components/UIElements/Footer';
import Modal from './shared/components/UIElements/Modal';

function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Route exact path='/' component={Home} />
        <Footer />
        <Modal></Modal>
      </div>
    </Router>
  );
}

export default App;
