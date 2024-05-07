import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  // UilChartPie,
  UilCube
  // UilDocumentLayoutRight,
  // UilFilesLandscapesAlt,
  // UilPuzzlePiece
} from '@iconscout/react-unicons';
import { isQberiAdmin } from 'Actions/IsAdmin';

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

export const routes: RouteItems[] = [
  {
    label: 'Dashboard',
    icon: UilCube,
    labelDisabled: true,
    pages: [
      // {
      //   name: 'Roxwealth',
      //   path: '/dashboard/roxwealth',
      //   icon: 'pie-chart',
      //   active: true
      // },
      // {
      //   name: 'Hospital Merch Home',
      //   path: '/hospitalmerch/home',
      //   icon: 'shopping-cart',
      //   active: true
      // },
      // {
      //   name: 'Bummel',
      //   path: '/dashboard/bummel',
      //   icon: 'shopping-cart',
      //   active: true
      // },
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

// const HospitalMerchAdminRoutes: Route = {
//   name: 'Hospital Merch Admin',
//   icon: 'globe',
//   active: true,
//   pages: [
//     {
//       name: 'Users',
//       path: '/hospitalmerch/users',
//       icon: 'users',
//       active: true
//     },
//     {
//       name: 'Groups and Roles',
//       path: '/hospitalmerch/groups-roles',
//       icon: 'trello',
//       active: true
//     },
//     {
//       name: 'Customers',
//       path: '/hospitalmerch/Customers',
//       icon: 'users',
//       active: true
//     }
//   ]
// };

// const AppRoutes: Route[] = [];

// const HospitalMerchAppRoutes: Route = {
//   // need to move
//   name: 'Hospital Merch',
//   icon: 'tag',
//   active: true,
//   pages: [
//     {
//       name: 'Types',
//       icon: 'tag',
//       active: true,
//       path: '/hospitalmerch/types'
//     },
//     {
//       name: 'Product Group',
//       icon: 'tag',
//       active: true,
//       pages: [
//         {
//           name: 'Batteries',
//           path: '/hospitalmerch/products',
//           icon: 'tag',
//           active: true
//         },
//         {
//           name: 'Medical Equipments',
//           path: '/hospitalmerch/add-product-equipments',
//           icon: 'layout',
//           active: true
//         },
//         {
//           name: 'Add Battery',
//           path: '/hospitalmerch/add-product-batteries',
//           icon: 'trello',
//           active: true
//         }
//       ]
//     }
//   ]
//   // up to here
// };

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

// const sampleResponse: ResponseType[] = [
//   {
//     id: '55b76b7c-402a-4bf4-8e48-f0a964f7fb88',
//     name: 'Hospital Merch',
//     logo: 'https://example.com/logos/tech_innovators_logo.png',
//     description:
//       'A leading tech company focused on procuring medical equipments.',
//     users: null,
//     applications: [
//       {
//         id: 'b1b1b1b1-402a-4bf4-8e48-f0a964f7fb88',
//         name: 'HA-1',
//         description:
//           'A leading tech company focused on procuring medical equipments.',
//         createdBy: {
//           id: '2c819619-0101-3bcf-889c-04a16f8153fc',
//           firstName: null,
//           lastName: null,
//           pictureUrl: null,
//           email: null
//         },
//         createdAt: '2024-05-06T12:04:46.240+00:00',
//         lastModifiedAt: '2024-05-06T12:04:46.240+00:00',
//         isDeleted: false
//       }
//     ],
//     createdBy: {
//       id: '2c819619-0101-3bcf-889c-04a16f8153fc',
//       firstName: null,
//       lastName: null,
//       pictureUrl: null,
//       email: null
//     },
//     createdAt: '2024-05-06T12:04:46.240+00:00',
//     lastModifiedAt: '2024-05-06T12:04:46.240+00:00',
//     isDeleted: false
//   }
// ];

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
      // check if applications is not null
      {
        name: 'Applications',
        path: '/org/' + org.id + '/applications',
        // icon: 'trello',
        active: true,
        pages: org.applications
          ? org.applications.map(app => {
              return {
                name: app.name,
                path: '/org/' + org.id + '/applications/' + app.id,
                icon: 'trello',
                active: true
              };
            })
          : [
              {
                name: 'AddProduct',
                path: '/org/' + org.id + '/app/add-product',
                icon: 'trello',
                active: true
              }
            ]
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

// if (isHospitalMerchAdmin()) {
//   AdminRoutes.push(HospitalMerchAdminRoutes);
// }

// if (isHospitalMerchAdmin()) {
//   AppRoutes.push(HospitalMerchAppRoutes);
// }

if (AdminRoutes.length > 0) {
  routes.push({
    label: 'Admin',
    icon: UilCube,
    pages: AdminRoutes
  });
}

// if (AppRoutes.length > 0) {
//   routes.push({
//     label: 'Apps',
//     icon: UilCube,
//     pages: AppRoutes
//   });
// }

export default routes;
