// import EcommerceFooter from 'components/footers/EcommerceFooter';
import Footer from 'components/footers/Footer';
// import EcommerceTopbar from 'components/navbars/ecommerce/EcommerceTopbar';
// import EcommerceNavbar from 'components/navbars/ecommerce/EcommerceNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import useSettingsMountEffect from 'hooks/useSettingsMountEffect';
// import ChatWidget from 'components/common/chat-widget/ChatWidget';
// import { Container } from 'react-bootstrap';
import { useAppContext } from 'providers/AppProvider';
// import NavbarVertical from 'components/navbars/navbar-vertical/NavbarVertical';
import NavbarTopDefault from 'components/navbars/navbar-top/NavbarTopDefault';
import NavbarDual from 'components/navbars/navbar-dual/NavbarDual';
import classNames from 'classnames';
import { useMainLayoutContext } from 'providers/MainLayoutProvider';
import NavbarVericalEcommerce from 'components/navbars/navbar-vertical/NavbarVerticalEcommerce';
import { useEffect } from 'react';
import validateSession from 'Actions/validateSession';

const EcommerceLayout = () => {
  const {
    config: { navbarPosition }
  } = useAppContext();
  useSettingsMountEffect({
    disableNavigationType: true,
    disableHorizontalNavbarAppearance: true,
    disableVerticalNavbarAppearance: true,
    disableHorizontalNavbarShape: true
  });
  const { contentClass, footerClass } = useMainLayoutContext();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Qberi';
    if (!validateSession()) {
      navigate('/auth/sign-in');
    }
  }, []);

  return (
    <div>
      {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
        <NavbarVericalEcommerce />
      )}
      {navbarPosition === 'vertical' && <NavbarTopDefault />}
      {/* {(navbarPosition === 'horizontal' || navbarPosition === 'combo') && (
            <NavbarTopHorizontal />
          )} */}
      {navbarPosition === 'dual' && <NavbarDual />}

      <div className={classNames(contentClass, 'content')}>
        <Outlet />
        <Footer className={classNames(footerClass, 'position-absolute')} />
      </div>
    </div>
  );
};

export default EcommerceLayout;
