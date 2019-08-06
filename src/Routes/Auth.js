import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../Components/Input';
import Button from '../Components/Button';
import useInput from '../Hooks/useInput';

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

export default () => {
  const [action, setAction] = useState('logIn');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const username = useInput('');
  const password = useInput('');

  return (
    <Wrapper>
      <Form>
        {action === 'logIn' ? (
          <form>
            <Input placeholder={'Username'} {...username} />
            <Input placeholder={'Password'} {...password} type='password' />
            <Button text={'Log In'} />
          </form>
        ) : (
          <form>
            <Input placeholder={'First name'} {...firstName} />
            <Input placeholder={'Last name'} {...lastName} />
            <Input placeholder={'Email'} {...email} type='email' />
            <Input placeholder={'Username'} {...username} />
            <Input placeholder={'Password'} {...password} type='password' />
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
            <Link onClick={() => setAction('SignUp')}>Sign Up</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
