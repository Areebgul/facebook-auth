import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountInsights = ({ longLivedToken }) => {
  console.log({ longLivedToken });
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    console.log('running....');
    if (longLivedToken) {
      const fetchAccountInsights = async () => {
        try {
          const response = await axios.get(
            `https://graph.facebook.com/v13.0/me/adaccounts?fields=insights&access_token=${longLivedToken}`
          );
          console.log({ response });
          const accountInsights = response.data.data.map((account) => ({
            id: account.id,
            // name: account.name,
            // insights: account.insights.data,
          }));
          console.log({ accountInsights });
          setInsights(accountInsights);
        } catch (error) {
          console.error("error fetching insights::", error);
        }
      };

      fetchAccountInsights();
    }
  }, [longLivedToken]);

  return (
    <div>
      <h2>Account Insights</h2>
      {insights ? (
        <div>
          {insights.map((account) => (
            <div key={account.id}>
              <h3>{account.id}</h3>
              <ul>
                {/* {account.insights.map((insight) => (
                  <li key={insight.date_start}>
                    <p>Date: {insight.date_start}</p>
                    <p>Clicks: {insight.clicks}</p>
                  </li>
                ))} */}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading account insights...</p>
      )}
    </div>
  );
};

export default AccountInsights;
