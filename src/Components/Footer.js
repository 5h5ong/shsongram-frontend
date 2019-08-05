import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
`;
const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;
const ListItem = styled.div`
  /* &:not(:last-child) {
    margin-left: 16px;
  } */
  margin-left: 16px;
`;
const List = styled.li`
  display: flex;
`;
const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link herf='#'>about as</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>support</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>press</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>api</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>jobs</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>privacy</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>terms</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>directory</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>profile</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>hashtags</Link>
      </ListItem>
      <ListItem>
        <Link herf='#'>language</Link>
      </ListItem>
    </List>
    <Copyright>Shsongram Clone {new Date().getFullYear()}&copy;</Copyright>
  </Footer>
);
