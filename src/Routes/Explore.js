import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import Post from '../Components/Post';
import Loader from '../Components/Loader';

const ALL_POST_QUERY = gql`
  {
    seeAllPost {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      comments {
        id
        text
        user {
          id
          username
        }
      }
      likeCount
      isLiked
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
`;

export default () => {
  const { data, loading } = useQuery(ALL_POST_QUERY);
  console.log(data, loading);
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeAllPost) {
    return (
      <Wrapper>
        {data.seeAllPost.map(post => (
          <Post
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            location={post.location}
            caption={post.caption}
            createdAt={post.createdAt}
          />
        ))}
      </Wrapper>
    );
  }
  return null;
};
