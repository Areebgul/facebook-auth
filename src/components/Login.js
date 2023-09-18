import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const Login = ({ onLogin }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setLoggedIn(true);
      onLogin(response.accessToken);
    }
  };

  return (
    <div>
      {!loggedIn ? (
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          autoLoad={true}
          fields="name"
          scope="public_profile,user_friends,user_actions.books"
          callback={responseFacebook}
        />
      ) : (
        <p>Logged In</p>
      )}
    </div>
  );
};

export default Login;
