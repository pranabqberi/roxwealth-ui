import { useEffect, useState } from 'react';

const Ecommerce = () => {
  const [appData, setAppData] = useState({
    isLoggedIn: false,
    user: null
  });

  useEffect(() => {
    const data = localStorage.getItem('appData');
    if (data) {
      setAppData(JSON.parse(data));
    }

    // check if the user is logged in
    if (!appData.isLoggedIn) {
      window.location.href = '/pages/landing/alternate';
    }
  }, []);
  return <></>;
};

export default Ecommerce;
