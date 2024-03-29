import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { HeartEmpty, Compass, User, Logo } from './Icons';
import useInput from '../Hooks/useInput';
import { Container as inputContainer } from './Input';
import { ME } from '../SharedQueries';

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  position: fixed;
  top: 0;
  left: 0
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  padding: 25px 0px;
  z-index: 2;
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
`;
const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;
const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;
const SearchInput = styled(inputContainer)`
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

export default withRouter(({ history }) => {
  const search = useInput('');
  const { data, loading } = useQuery(ME);
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to='/'>
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder='Search'
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to='/explore'>
            <Compass />
          </HeaderLink>
          <HeaderLink to='/notifications'>
            <HeartEmpty />
          </HeaderLink>
          {loading && (
            <HeaderLink to='/#'>
              <User />
            </HeaderLink>
          )}
          {!loading && data.me && (
            <HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
