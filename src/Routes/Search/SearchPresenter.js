import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`
  height: 50vh;
`;
const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(4, 160px);
  grid-gap: 25px;
  grid-template-rows: 170px;
  grid-auto-rows: 170px;
`;
const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({
  searchTerm,
  loading,
  data,
  likeCount,
  commentCount
}) => {
  if (searchTerm === '') {
    return (
      <Wrapper>
        {searchTerm === '' && <FatText text={'무엇이든 찾아보세요!'} />}
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text={'유저를 찾지 못했습니다.'} />
          ) : (
            data.searchUser.map(user => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text={'포스트를 찾지 못했습니다.'} />
          ) : (
            data.searchPost.map(post => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};
SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
