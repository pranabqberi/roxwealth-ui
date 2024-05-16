import { createContext, useState } from 'react';
import { OrganizationType } from 'sitemap2';

interface SitemapContextInterface {
  role: string;
  setRole: (role: string) => void;
  organizations: OrganizationType[];
  setOrganizations: (organizations: OrganizationType[]) => void;
}

const SitemapContext = createContext({} as SitemapContextInterface);

const SitemapContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const localRole = localStorage.getItem('role');
  const orgs: OrganizationType[] = JSON.parse(
    localStorage.getItem('orgs') || '[]'
  );
  const [role, setRole] = useState(localRole || 'user');
  const [organizations, setOrganizations] = useState<OrganizationType[]>(orgs);

  return (
    <SitemapContext.Provider
      value={{
        role,
        setRole,
        organizations,
        setOrganizations
      }}
    >
      {children}
    </SitemapContext.Provider>
  );
};

export { SitemapContext, SitemapContextProvider };
