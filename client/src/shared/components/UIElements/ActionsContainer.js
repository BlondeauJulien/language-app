import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import SearchLogo from '../../SVGImages/SearchLogo';
import CreateLogo from '../../SVGImages/CreateLogo';
import Button from '../FormElements/Button';
import Input from '../FormElements/Input';
import AuthContext from '../../../context/auth/authContext';

import './ActionsContainer.css';

const ActionsContainer = props => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const { authForm, setAuthForm} = props;
  const { user } = authContext;
  const [ redirect, setRedirect ] = useState({redirect: false, to: ''});
  const [ form, setForm ] = useState({ name: ''});

  useEffect(() => {
    if(redirect.redirect && user) {
      history.push(redirect.to);
    }
    if(!authForm.show && redirect.redirect) {
      setRedirect({...redirect, redirect: false, to: ''});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, redirect, authForm]);

  const onClickCreate = () => {
    if(!user) {
      setAuthForm({...authForm, show: true, component: 'login' });
      setRedirect({...redirect, redirect: true, to: '/form/course'});
    } else {
      history.push('/form/course')
    }
  }

  const onClickAdvancedSearch = () => {
    props.resetCourses();
  }

  const onChange = e => {
    setForm({...form, [e.target.id]: e.target.value});
  }

  const onSubmitQuickSearch = e => {
    e.preventDefault();
    props.getCourses(form);
    history.push('/search')
  }

  const logo = (<i className="fas fa-search" style={{'color': 'var(--brand-color)', 'marginRight': '8px'}}></i>)
  return (
    <div className="actions-container">
      <div className="action-container">
        <div className="action-image">
          <SearchLogo />
        </div>
        <div className="action-content">
          <h3>
            Search a course{` `}
            <Link to="/search" onClick={onClickAdvancedSearch} style={{'fontSize': '0.6rem', 'color': 'var(--brand-color)'}}>
              advanced
            </Link>
          </h3>
          <form onSubmit={onSubmitQuickSearch}>
            <Input 
              id={'name'}
              className={'input-container-with-logo'}
              value={form.name}
              onChange={onChange}
              element={'input'}
              type={'text'}
              placeholder={'e.g., Norwegian, French...'}
              logo={logo}
            />
          </form>

        </div>
      </div>
      <div className="action-container">
        <div className="action-image action-image-create-logo">
          <CreateLogo />
        </div>
        <div className="action-content">
          <h3>Create your own</h3>
          <Button type={'button'} size={'button-full-length'} onClick={onClickCreate}>Create</Button>
        </div>
      </div>
    </div>
  )
}

export default ActionsContainer
