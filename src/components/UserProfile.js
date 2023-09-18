import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ accessToken }) => {
  const [userProfile, setUserProfile] = useState(null);

  async function getData(accessToken) {
    await axios
      .get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`)
      .then((response) => {
        console.log({ response });
        window.sessionStorage.setItem("id", response.data.id);
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (accessToken) {
      getData(accessToken)
    }
  }, [accessToken]);

  return (
    <div>
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
