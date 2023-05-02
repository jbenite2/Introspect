import { useEffect } from 'react';

const RedirectPage = () => {
  useEffect(() => {
    window.location.href = 'https://iep.utm.edu/care-ethics/';
  }, []);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
