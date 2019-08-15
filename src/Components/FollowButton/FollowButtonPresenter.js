import React from 'react';
import Button from '../Button';

const FollowButtonPresenter = ({ isFollowing, onClick }) => {
  return (
    <Button onClick={onClick} text={isFollowing ? 'unFollow' : 'Follow'} />
  );
};

export default FollowButtonPresenter;
