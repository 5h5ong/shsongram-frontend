import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../Hooks/useInput';
import AuthPresenter from '../Auth/AuthPresenter';
import { LOGIN } from './AuthQueries';

export default () => {
  const [action, setAction] = useState('logIn');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const username = useInput('');
  const password = useInput('');
  const [requestSecret] = useMutation(LOGIN, {
    variables: { email: email.value }
  });

  const onLogin = e => {
    e.preventDefault();
    if (email !== '') {
      requestSecret();
    }
  };

  return (
    <AuthPresenter
      firstname={firstName}
      lastName={lastName}
      email={email}
      username={username}
      password={password}
      action={action}
      setAction={setAction}
      onLogin={onLogin}
    />
  );
};
