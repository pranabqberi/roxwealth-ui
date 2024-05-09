import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon, UilCube } from '@iconscout/react-unicons';
import { isQberiAdmin } from 'Actions/IsAdmin';
import { UpdateOrgs } from 'Actions/UpdateOrgs';

export interface Route {
  name: string;
  icon?: IconProp | string | string[];
  iconSet?: 'font-awesome' | 'feather' | 'unicons';
  pages?: Route[];
  path?: string;
  pathName?: string;
  flat?: boolean;
  topNavIcon?: string;
  dropdownInside?: boolean;
  active?: boolean;
  new?: boolean;
  hasNew?: boolean;
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: Icon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}

type ApplicationsType = {
  id: string;
  name: string;
  description: string;
  createdBy: any;
  createdAt: string;
  lastModifiedAt: string;
  isDeleted: boolean;
};

type ResponseType = {
  id: string;
  name: string;
  logo: string;
  description: string;
  users: any;
  applications: [ApplicationsType] | null;
  createdBy: any;
  createdAt: string;
  lastModifiedAt: string;
  isDeleted: boolean;
};

export const routes: RouteItems[] = [
  {
    label: 'Dashboard',
    icon: UilCube,
    labelDisabled: true,
    pages: [
      {
        name: 'Profile',
        path: '/profile',
        icon: 'user',
        active: true
      }
    ]
  }
];

let AdminRoutes: Route[] = [];

const QberiAdminRoutes: Route = {
  name: 'Qberi',
  active: true,
  icon: 'message-square',
  pages: [
    {
      name: 'Users',
      path: '/admin/users',
      icon: 'users',
      active: true
    },
    {
      name: 'Group and Roles',
      path: '/admin/groups-roles',
      icon: 'trello',
      active: true
    },
    {
      name: 'Client',
      path: '/dashboard/roxwealth',
      icon: 'users',
      active: true
    }
  ]
};

const local = JSON.parse(localStorage.getItem('orgs') || '[]');

const sample: ResponseType[] = local;

const OrganizationRoutes: Route[] = [];

sample.map(org => {
  OrganizationRoutes.push({
    name: org.name,
    path: '/org/' + org.id,
    active: true,
    pages: [
      {
        name: 'Users',
        path: '/org/' + org.id + '/users',
        icon: 'users',
        active: true
      },
      {
        name: 'View',
        path: '/org/' + org.id + '/view',
        icon: 'eye',
        active: true
      },
      {
        name: 'Create App',
        path: '/org/' + org.id + '/create-app',
        icon: 'plus',
        active: true
      }
    ]
  });
});

const MyOrganizations: RouteItems = {
  label: 'My Organizations',
  icon: UilCube,
  megaMenu: true,
  pages: [
    {
      name: 'Create',
      path: '/org/create',
      icon: 'plus',
      active: true
    },
    {
      name: 'View',
      path: '/org/view',
      icon: 'eye',
      active: true
    }
  ]
};

if (OrganizationRoutes.length > 0) {
  OrganizationRoutes.map(org => {
    MyOrganizations.pages.push(org);
  });
}

routes.push(MyOrganizations);

if (isQberiAdmin()) {
  AdminRoutes = [QberiAdminRoutes];
}

if (AdminRoutes.length > 0) {
  routes.push({
    label: 'Admin',
    icon: UilCube,
    pages: AdminRoutes
  });
}

export const getRoutes = () => {
  UpdateOrgs();
  return routes;
};

// input: type of user: user, verified, admin

type OrganizationType = {
  id: string;
  name: string;
  description: string;
  createdBy: any;
  createdAt: string;
  lastModifiedAt: string;
  isDeleted: boolean;
  applications: [ApplicationsType];
};

const getRandomIcon = () => {
  const icons = [
    'phone',
    'bookmark',
    'message-square',
    'mail',
    'calendar',
    'compass',
    'help-circle',
    'globe',
    'tag',
    'bell',
    'users',
    'clock',
    'alert-triangle',
    'lock',
    'layout',
    'file-text',
    'trello',
    'share-2',
    'chart-pie',
    'cube',
    'document-layout-right',
    'files-landscapes-alt',
    'puzzle-piece'
  ];

  const len = icons.length;
  const random = Math.floor(Math.random() * len);
  return icons[random];
};

export const getMainSiteMap = (type: string[]) => {
  UpdateOrgs();
  const local = JSON.parse(localStorage.getItem('orgs') || '[]');

  const ApplicationMap: RouteItems = {
    label: 'My Applications',
    icon: UilCube,
    pages: []
  };

  const AdminMap: RouteItems = {
    label: 'Admin',
    icon: UilCube,
    pages: [
      {
        name: 'Users',
        path: '/admin/users',
        icon: 'users',
        active: true
      },
      {
        name: 'Group and Roles',
        path: '/admin/groups-roles',
        icon: 'trello',
        active: true
      },
      {
        name: 'Client',
        path: '/dashboard/roxwealth',
        icon: 'users',
        active: true
      }
    ]
  };

  const OrganizationMap: RouteItems = {
    label: 'My Organizations',
    icon: UilCube,
    pages: [
      {
        name: 'Create',
        path: '/org/create',
        icon: 'plus',
        active: true
      },
      {
        name: 'View',
        path: '/org/view',
        icon: 'eye',
        active: true
      }
    ]
  };

  const organizationList: RouteItems = {
    label: 'Organizations',
    icon: UilCube,
    pages: []
  };

  local.map((org: OrganizationType) => {
    // Add type annotation to 'org'
    OrganizationMap.pages.push({
      name: org.name,
      path: '/org/' + org.id,
      icon: getRandomIcon(),
      active: true,
      pages: [
        {
          name: 'Details',
          path: '/org/' + org.id + '/view',
          icon: 'eye',
          active: true
        },
        {
          name: 'User Management',
          path: '/org/' + org.id + '/users',
          icon: 'users',
          active: true
        },
        {
          name: 'Create App',
          path: '/org/' + org.id + '/create-app',
          icon: 'plus',
          active: true
        }
      ]
    });
    organizationList.pages.push({
      name: org.name,
      path: '/admin/org/' + org.id,
      icon: getRandomIcon(),
      active: true
    });
    if (org.applications) {
      org.applications.map((app: ApplicationsType) => {
        ApplicationMap.pages.push({
          name: app.name,
          path: '/app/' + app.id + '/home',
          icon: getRandomIcon(),
          active: true
        });
      });
    }
  });

  const routes: RouteItems[] = [
    {
      label: 'Main',
      icon: UilCube,
      pages: [
        {
          name: 'Profile',
          path: '/profile',
          icon: 'user',
          active: true
        }
      ]
    }
  ];

  if (type.includes('admin')) {
    routes.push(AdminMap);
    if (organizationList.pages.length > 0) {
      routes.push(organizationList);
    }
  } else if (type.includes('verified')) {
    routes.push(OrganizationMap);
    if (ApplicationMap.pages.length > 0) {
      routes.push(ApplicationMap);
    }
  }

  return routes;
};

export default routes;
