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
import Spinner from '../../shared/SVGImages/Spinner';

const UserProfile = () => {
	const authContext = useContext(AuthContext);

	const {
		logout, 
		user, 
		deleteUser, 
		loading, 
		editProfile, 
		error, 
		setAuthError, 
		success, 
		resetSuccess, 
		getUserCourses, 
		clearUserCourses,
		getUsers
	} = authContext;
	const history = useHistory();
	const [ componentToDisplay, setComponentToDisplay ] = useState('profile');
	const [ isEditMode, setIsEditMode ] = useState(false);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ postsPerPage ] = useState(1);
	
	useEffect(() => {
		paginate(1);
    if (user && componentToDisplay === 'courses' && !user.courses) {
      getUserCourses(user.id);
		}

		if (user && componentToDisplay === 'users' && !user.users) {
      getUsers();
		}

  }, [ componentToDisplay ]);

	useEffect(() => {
    if (!user) {
      history.push('/');
		}
		return () => {
			if(user && user.courses) {
				clearUserCourses();
			}
		}
  }, [ user ]);
    
  useEffect(() => {
    if (success === 'edit-profile') {
      resetSuccess();
      setIsEditMode(false);
    }
  }, [ success ]);

	const paginate = pageNumber => {
    setCurrentPage(pageNumber);
	};
	
	return (
		<MainPageContentContainer>
			{user && (
				<Fragment>
					<ProfileNav 
						setIsEditMode={setIsEditMode} 
						componentToDisplay={componentToDisplay}
						setComponentToDisplay={setComponentToDisplay}
						userRole={user.role}
					/>
					{
						componentToDisplay === 'courses' && user.courses && (
							<CardsContainer 
								courses={user.courses}
								paginate={paginate}
								postsPerPage={postsPerPage}
								currentPage={currentPage}
								totalItems={user.courses.length}
							/> 
						)
					}
					{
						componentToDisplay === 'profile' && (
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
						)
					}
					{ componentToDisplay === 'users' && user.users && <ItemsList itemsFor={componentToDisplay} items={user.users}/>}
					{ componentToDisplay === 'review' && user.imageToReview && <ItemsList itemsFor={componentToDisplay} items={user.imageToReview}/>}
					{
						loading && componentToDisplay !== 'profile' && (
							<div className="profile-spinner-container">
								<Spinner />
							</div>
						)
					}
				</Fragment>
			)}
		</MainPageContentContainer>
	);
};

export default UserProfile;
