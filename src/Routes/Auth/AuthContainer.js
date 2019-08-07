import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';
import useInput from '../../Hooks/useInput';
import AuthPresenter from '../Auth/AuthPresenter';
import { LOGIN, CREATE_ACCOUNT } from './AuthQueries';

export default () => {
  const [action, setAction] = useState('logIn');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('call5h5ong@gmail.com');
  const username = useInput('call5h5ong');
  const password = useInput('');
  const [requestSecret] = useMutation(LOGIN, {
    variables: { email: email.value },
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error('해당 계정이 존재하지 않습니다. 새로 만드세요!');
        setTimeout(() => setAction('SignUp'), 3000);
      }
    }
  });
  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === 'logIn') {
      if (email.value !== '') {
        requestSecret();
      }
    } else if (action === 'SignUp') {
      if (
        email.value !== '' &&
        username.value !== '' &&
        firstName !== '' &&
        lastName !== ''
      ) {
        try {
          await createAccount();
        } catch (e) {
          toast.error(e.message);
        }
      }
    }
  };

  return (
    <AuthPresenter
      firstName={firstName}
      lastName={lastName}
      email={email}
      username={username}
      password={password}
      action={action}
      setAction={setAction}
      onSubmit={onSubmit}
    />
  );
};
