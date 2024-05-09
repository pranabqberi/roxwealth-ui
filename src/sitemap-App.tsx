import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon, UilCube, UilTrophy } from '@iconscout/react-unicons';

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

const getAppSitemap = (appID: string): RouteItems[] => {
  const routes: RouteItems[] = [
    {
      label: 'Back',
      labelDisabled: true,
      icon: UilTrophy,
      pages: [
        {
          name: 'Back',
          icon: 'arrow-left',
          path: '/org/view',
          active: true
        }
      ]
    },
    {
      label: 'App ',
      icon: UilCube,
      pages: [
        {
          name: 'Home',
          icon: 'home',
          path: '/app/' + appID + '/home',
          active: true
        },
        {
          name: 'Orders',
          icon: 'shopping-cart',
          path: '/app/' + appID + '/orders',
          active: true
        },
        {
          name: 'Customers',
          icon: 'users',
          path: '/app/' + appID + '/customers',
          active: true
        }
      ]
    }
  ];
  return routes;
};

export default getAppSitemap;
