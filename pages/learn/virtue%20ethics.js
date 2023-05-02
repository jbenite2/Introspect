import { useEffect } from 'react';

const RedirectPage = () => {
  useEffect(() => {
    window.location.href = 'https://plato.stanford.edu/entries/ethics-virtue/';
  }, []);

  return <div>Redirecting...</div>;
};

export default RedirectPage;