import React, { useState } from 'react';
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
import MainForm from './form/pages/MainForm';

import AuthState from './context/auth/AuthState';

function App() {
	const [authForm, setAuthForm] = useState({show: false, component: ''});

	return (
		<AuthState>
			<Router>
				<div className="App">
					<MainHeader authForm={authForm} setAuthForm={setAuthForm}/>
					<Route exact path="/" component={Home} />
					<Route exact path="/profile" component={UserProfile} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/course" component={Course} />
					<Route exact path="/word" component={Word} />
					<Route exact path="/quiz" component={Quiz} />
					<Route exact path="/form" component={MainForm} />
					<Footer />
					{authForm.show && (
						<Modal onClose={() => setAuthForm({...authForm, show: false, component: ''})}>
							<AuthForm authForm={authForm} setAuthForm={setAuthForm}/>
						</Modal>
					)}
				</div>
			</Router>
		</AuthState>
	);
}

export default App;
