import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import PostPresenter from './PostPresenter';
import useInput from '../../Hooks/useInput';
import { ADD_COMMENT, TOGGLE_LIKE } from './PostQueries';

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  location,
  caption,
  createdAt
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItemS, setCurrentItem] = useState(0);
  const comment = useInput('');
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });
  const slide = () => {
    const totalItems = files.length;
    if (currentItemS === totalItems - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItemS + 1), 3000);
    }
  };
  useEffect(() => {
    slide();
  }, [currentItemS]);

  const toggleLike = async () => {
    toggleLikeMutation();
    if (isLikedS) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };
  const onKeyPress = e => {
    const { keyCode } = e;
    if (keyCode === 13) {
      if (comment.value !== '\n') {
        console.log('comment.value is not null!');
        comment.setValue('');
        addCommentMutation();
      } else {
        comment.setValue('');
      }
      return;
    }
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      isLiked={isLikedS}
      newComment={comment}
      location={location}
      createdAt={createdAt}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItemS}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      comments={comments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
