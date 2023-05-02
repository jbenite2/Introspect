import { useEffect } from 'react';

const RedirectPage = () => {
  useEffect(() => {
    window.location.href = 'https://plato.stanford.edu/entries/utilitarianism-history/';
  }, []);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
