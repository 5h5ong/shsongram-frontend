import React from 'react';
import Helmet from 'react-helmet';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

const FEED_QUERY = gql`
  {
    seeFeed {
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
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Shsongram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
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
};
