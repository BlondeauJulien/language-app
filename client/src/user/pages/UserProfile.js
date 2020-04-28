import React, { useEffect, useContext, Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import ProfileNav from '../components/ProfileNav';
import ProfileInfos from '../components/ProfileInfos';
import ProfileForm from '../components/ProfileForm';
import ItemsList from '../components/ItemsList';
import AuthContext from '../../context/auth/authContext';

import './UserProfile.css';

const UserProfile = () => {
	const authContext = useContext(AuthContext);

	const { logout, user, deleteUser, loading, editProfile, error, setAuthError, success, resetSuccess } = authContext;
  const history = useHistory();
  const [ isEditMode, setIsEditMode ] = useState(false);

	useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [ user ]);
    
  useEffect(() => {
    if (success === 'edit-profile') {
      resetSuccess();
      setIsEditMode(false);
    }
  }, [ success ]);

	let courses = [
		{
			name: 'Learn Norwegian colours',
			countryFlag: 'NO',
			language: 'Norwegian',
			learningFrom: 'French',
			creator: {
				username: 'julien'
			}
		},
		{
			name: 'Learn Norwegian colours',
			countryFlag: 'NO',
			language: 'Norwegian',
			learningFrom: 'French',
			creator: {
				username: 'julien123456789'
			}
		},
		{
			name: 'Learn Norwegian colours Learn Norwegian colours',
			countryFlag: 'NO',
			language: 'Norwegian',
			learningFrom: 'French',
			creator: {
				username: 'julien'
			}
		}
	];
	return (
		<MainPageContentContainer>
			{user && (
				<Fragment>
					<ProfileNav setIsEditMode={setIsEditMode}/>
					{/* <CardsContainer courses={courses}/>  */}
					<div className="profile-container">
            {
              isEditMode ? (
                <ProfileForm 
                  user={user} 
                  editProfile={editProfile} 
                  error={error} 
                  setIsEditMode={setIsEditMode}
                  setAuthError={setAuthError}
                />
              ) : (
                <ProfileInfos 
                  logout={logout} 
                  deleteUser={deleteUser} 
                  loading={loading} 
                  user={user} 
                  setIsEditMode={setIsEditMode}
                />
              )
            }
					</div>
					{/* <ItemsList /> */}
				</Fragment>
			)}
		</MainPageContentContainer>
	);
};

export default UserProfile;
