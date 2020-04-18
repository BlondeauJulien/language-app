import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import ProfileNav from '../components/ProfileNav';
import ProfileInfos from '../components/ProfileInfos';
import ProfileForm from '../components/ProfileForm';
import UsersList from '../components/UsersList';

import './UserProfile.css';

const UserProfile = () => {
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
    },
  ]
  return (
    <MainPageContentContainer>
      <ProfileNav />
{/*       <CardsContainer courses={courses}/> */}
{/*       <div className="profile-container">
        <ProfileInfos />
        <ProfileForm />
      </div> */}
      <UsersList />
    </MainPageContentContainer>
  )
}

export default UserProfile
