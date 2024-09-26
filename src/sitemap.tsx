import { IconProp } from '@fortawesome/fontawesome-svg-core';
// import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import {
  Icon,
  // UilChartPie,
  UilCube
  // UilDocumentLayoutRight,
  // UilFilesLandscapesAlt,
  // UilPuzzlePiece
} from '@iconscout/react-unicons';
import { isHospitalMerchAdmin, isQberiAdmin } from 'Actions/IsAdmin';

// List of ICONS available in the template
// phone, bookmark, message-square, mail, calendar, compass, help-circle, globe, tag, bell, users, clock, alert-triangle, lock, layout, file-text, trello, share-2, chart-pie, cube, document-layout-right, files-landscapes-alt, puzzle-piece
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

export const getMainSiteMap = (type: string): RouteItems[] => {
  const mainSiteMap: RouteItems[] = [
    {
      label: 'Dashboard',
      icon: UilCube,
      labelDisabled: true,
      pages: [
        {
          name: 'Default',
          path: '/dashboard/default',
          icon: 'home'
        }
      ]
    }
  ];

  const adminSiteMap: RouteItems[] = [
    {
      label: 'Admin',
      icon: UilCube,
      labelDisabled: true,
      pages: [
        {
          name: 'Dashboard',
          path: '/admin/dashboard',
          icon: 'home'
        },
        {
          name: 'Users',
          path: '/admin/users',
          icon: 'users'
        },
        {
          name: 'Roles',
          path: '/admin/roles',
          icon: 'lock'
        }
      ]
    }
  ];

  return mainSiteMap;
};
