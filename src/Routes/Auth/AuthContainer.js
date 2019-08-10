import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';
import useInput from '../../Hooks/useInput';
import AuthPresenter from '../Auth/AuthPresenter';
import {
  LOGIN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_USER_IN
} from './AuthQueries';

export default () => {
  const [action, setAction] = useState('logIn');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const username = useInput('');
  const password = useInput('');
  const secret = useInput('');
  const [requestSecretMutation] = useMutation(LOGIN, {
    variables: { email: email.value }
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: { secret: secret.value, email: email.value }
  });
  const [localLogInMutation] = useMutation(LOCAL_USER_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === 'logIn') {
      if (email.value !== '') {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error(
              '해당 계정은 존재하지 않습니다. 새로운 계정을 만들어보세요!'
            );
            setTimeout(() => setAction('signUp'), 3000);
          } else {
            toast.success(
              'secret key가 해당 메일로 전송되었습니다. 확인해보세요!'
            );
            setAction('confirm');
          }
        } catch {
          toast.error('요청이 실패하였습니다. 다시 시도해주세요.');
        }
      }
    } else if (action === 'signUp') {
      if (
        email.value !== '' &&
        username.value !== '' &&
        firstName !== '' &&
        lastName !== ''
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error('계정을 만들 수 없습니다.');
          } else {
            toast.success('계정 생성을 완료했습니다. 로그인 하세요!');
            setTimeout(() => setAction('logIn'), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      }
    } else if (action === 'confirm') {
      if (secret.value !== '') {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          if (token !== '' && token !== undefined) {
            localLogInMutation({ variables: { token } });
            // TO DO: redirect root page.
          } else {
            throw Error();
          }
        } catch {
          toast.error('secret key를 인증할 수 없습니다. 다시 확인해주세요.');
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
      secret={secret}
      action={action}
      setAction={setAction}
      onSubmit={onSubmit}
    />
  );
};
