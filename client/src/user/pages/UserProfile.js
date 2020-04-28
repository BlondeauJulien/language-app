import React, { useEffect, useContext, Fragment } from 'react';
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

	const { logout, user, deleteUser, loading } = authContext;
	const history = useHistory();

	useEffect(
		() => {
			if (!user) {
				history.push('/');
			}
		},
		[ user ]
	);

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
					<ProfileNav />
					{/* <CardsContainer courses={courses}/>  */}
					<div className="profile-container">
						<ProfileInfos logout={logout} deleteUser={deleteUser} loading={loading} user={user} />
						{/*  <ProfileForm /> */}
					</div>
					{/* <ItemsList /> */}
				</Fragment>
			)}
		</MainPageContentContainer>
	);
};

export default UserProfile;
