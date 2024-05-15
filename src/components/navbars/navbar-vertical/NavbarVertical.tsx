import { Nav, Navbar } from 'react-bootstrap';
import { RouteItems } from 'sitemap2';
import { capitalize } from 'helpers/utils';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import {
  UilArrowFromRight,
  UilLeftArrowToLeft
} from '@iconscout/react-unicons';
import { useAppContext } from 'providers/AppProvider';
import classNames from 'classnames';
import Button from 'components/base/Button';
import NavbarTopNav from '../navbar-horizontal/NavbarTopNav';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import NavbarVerticalCollapseProvider from './NavbarVerticalCollapseProvider';
import { useContext, useEffect, useState } from 'react';
import { getMainSiteMap } from 'sitemap2';
import { SitemapContext } from 'providers/SitemapProvider';

const NavbarVerical = () => {
  const {
    config: {
      navbarPosition,
      openNavbarVertical,
      navbarVerticalAppearance,
      isNavbarVerticalCollapsed
    },
    setConfig
  } = useAppContext();

  const [routes, setRoutes] = useState<RouteItems[]>([]);

  const { role } = useContext(SitemapContext);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    const roles = profile.roles || {};
    const qberiRoles = roles.Qberi || [];

    const types: string[] = ['user'];

    if (qberiRoles.includes('ADMIN')) {
      types.push('admin');
    }
    if (qberiRoles.includes('VERIFIED USERS')) {
      types.push('verified');
    }

    setRoutes(getMainSiteMap(types));
  }, [role]);

  const { breakpoints } = useBreakpoints();

  return (
    <NavbarVerticalCollapseProvider>
      <Navbar
        className={classNames('navbar-vertical', {
          'navbar-darker': navbarVerticalAppearance === 'darker'
        })}
        expand="lg"
        variant=""
      >
        <Navbar.Collapse id="navbarVerticalCollapse" in={openNavbarVertical}>
          <div className="navbar-vertical-content">
            <Nav className="flex-column" as="ul" id="navbarVerticalNav">
              {routes.map(route => (
                <Nav.Item key={route.label}>
                  {!route.labelDisabled && (
                    <>
                      <p className="navbar-vertical-label">
                        {capitalize(route.label)}
                      </p>
                      <hr className="navbar-vertical-line" />
                    </>
                  )}
                  <NavbarVerticalMenu level={1} routes={route.pages} />
                </Nav.Item>
              ))}
            </Nav>

            {navbarPosition === 'combo' && breakpoints.down('lg') && (
              <div className="move-container">
                <div className="navbar-vertical-divider">
                  <hr className="navbar-vertical-hr" />
                </div>
                <NavbarTopNav />
              </div>
            )}
          </div>
        </Navbar.Collapse>
        <div className="navbar-vertical-footer">
          <Button
            className="navbar-vertical-toggle border-0 fw-semi-bold w-100 white-space-nowrap d-flex align-items-center"
            onClick={() => {
              setConfig({
                isNavbarVerticalCollapsed: !isNavbarVerticalCollapsed
              });
            }}
          >
            {isNavbarVerticalCollapsed ? (
              <UilArrowFromRight size={16} className="mb-1" />
            ) : (
              <>
                <UilLeftArrowToLeft size={16} className="mb-1" />
                <span className="ms-2">Collapsed View</span>
              </>
            )}
          </Button>
        </div>
      </Navbar>
    </NavbarVerticalCollapseProvider>
  );
};

export default NavbarVerical;
