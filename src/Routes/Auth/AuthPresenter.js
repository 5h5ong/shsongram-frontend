import React from 'react';
import styled from 'styled-components';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 350px;
  max-width: 100%;
`;

const StateChanger = styled(Box)`
  text-align: center;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100;
  }
  input {
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }
`;

export default ({
  firstName,
  lastName,
  email,
  username,
  password,
  action,
  setAction,
  onSubmit
}) => {
  console.log({ ...firstName });
  return (
    <Wrapper>
      <Form>
        {action === 'logIn' ? (
          <form onSubmit={onSubmit}>
            <Input placeholder={'email'} {...email} type='email' />
            {/* <Input placeholder={'Password'} {...password} type='password' /> */}
            <Button text={'Log In'} />
          </form>
        ) : (
          <form onSubmit={onSubmit}>
            <Input placeholder={'First name'} {...firstName} required={false} />
            <Input placeholder={'Last name'} {...lastName} required={false} />
            <Input placeholder={'Email'} {...email} type='email' />
            <Input placeholder={'Username'} {...username} />
            {/* <Input placeholder={'Password'} {...password} type='password' /> */}
            <Button text={'Sign Up'} />
          </form>
        )}
      </Form>
      <StateChanger>
        {action === 'logIn' ? (
          <>
            Don't have an account?{' '}
            <Link onClick={() => setAction('SignUp')}>Sign Up</Link>
          </>
        ) : (
          <>
            Have an account?{' '}
            <Link onClick={() => setAction('logIn')}>Log In</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
