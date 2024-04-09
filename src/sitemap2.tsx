import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  // UilChartPie,
  UilCube
  // UilDocumentLayoutRight,
  // UilFilesLandscapesAlt,
  // UilPuzzlePiece
} from '@iconscout/react-unicons';
import { isHospitalMerchAdmin, isQberiAdmin } from 'Actions/IsAdmin';

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
    label: 'Services',
    icon: UilCube,
    pages: [
      {
        name: 'Roxwealth',
        path: '/dashboard/roxwealth',
        icon: 'shopping-cart',
        active: true
      },
      {
        name: 'Hospital Merch Home',
        path: '/hospitalmerch/home',
        icon: 'shopping-cart',
        active: true
      }
    ]
  }
];

let AdminRoutes : Route[] = [];

const QberiAdminRoutes: Route = {
  name: 'Qberi Admin',
  active: true,
  pages: [
    {
      name: 'Users',
      path: '/admin/users',
      icon: 'lock',
      active: true
    },
    {
      name: 'Group and Roles',
      path: '/admin/groups-roles',
      icon: 'trello',
      active: true
    }
  ]
};

const isHospitalMerchAdminRoutes : Route = {
  name: 'Hospital Merch Admin',
  icon: 'UilCube',
  active: true,
  pages: [
    // {
    //   name: 'Home',
    //   path: '/hospitalmerch/home',
    //   icon: 'home',
    //   active: true
    // },
    {
      name: 'Equipment Battery',
      path: '/hospitalmerch/products',
      icon: 'tag',
      active: true
    },
    {
      name: 'Add Battery',
      path: '/hospitalmerch/add-product-batteries',
      icon: 'trello',
      active: true
    },
    {
      name: 'Medical Equipments',
      path: '/hospitalmerch/add-product-equipments',
      icon: 'layout',
      active: true
    }
  ]
};

if(isQberiAdmin()) {
  AdminRoutes = [QberiAdminRoutes];
}

if(isHospitalMerchAdmin()){
  AdminRoutes.push(isHospitalMerchAdminRoutes);
}

if (AdminRoutes.length > 0) {
  routes.push({
    label: 'Admin',
    icon: UilCube,
    pages: AdminRoutes
  });
}

export default routes;
