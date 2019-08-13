import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FatText from '../../Components/FatText';

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;
const SearchPresenter = ({ searchTerm, loading }) => (
  <Wrapper>
    {searchTerm === '' && <FatText text={'무엇이든 찾아보세요!'} />}
  </Wrapper>
);

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
