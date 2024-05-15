import { createContext, useState } from 'react';

interface SitemapContextInterface {
  role: string;
  setRole: (role: string) => void;
}

const SitemapContext = createContext({} as SitemapContextInterface);

const SitemapContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [role, setRole] = useState('user');

  return (
    <SitemapContext.Provider
      value={{
        role,
        setRole
      }}
    >
      {children}
    </SitemapContext.Provider>
  );
};

export { SitemapContext, SitemapContextProvider };
