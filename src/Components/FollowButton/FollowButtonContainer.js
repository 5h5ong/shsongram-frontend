import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import { toast } from 'react-toastify';
import FollowButtonPresenter from './FollowButtonPresenter';

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unFollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingS) {
      setIsFollowing(false);
      try {
        unFollowMutation();
      } catch (e) {
        toast.error(e);
      }
    } else {
      setIsFollowing(true);
      try {
        followMutation();
      } catch (e) {
        toast.error(e);
      }
    }
  };

  return <FollowButtonPresenter isFollowing={isFollowingS} onClick={onClick} />;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
