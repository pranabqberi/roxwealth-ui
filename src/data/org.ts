export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastModifiedAt: string;
  isDeleted: boolean;
};

export type ApplicationsType = {
  id?: string;
  name: string;
  logo: string;
  description: string;
  isPublished: boolean;
  organizationDetails: {
    id: string;
    name: string;
    logo: string;
    description: string;
  };
};

export type OrgType = {
  id?: string;
  name: string;
  logo: string;
  description: string;
  createdAt: string;
  lastModifiedAt: string;
  isDeleted: boolean;
  users: UserType[] | null;
  applications: ApplicationsType[] | null;
  createdBy?: any;
};
