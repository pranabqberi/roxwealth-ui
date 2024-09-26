/**
 * The main component of the application.
 * Renders the settings panel, toggle, and the main content based on the current route.
 */
import useToggleStyle from 'hooks/useToggleStyle';
import { useAppContext } from 'providers/AppProvider';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import { PopUp } from 'components/banners/PopUp';

const App = () => {
  const { isStylesheetLoaded } = useToggleStyle();
  const { pathname } = useLocation();

  const { setSettingsPanelConfig } = useSettingsPanelContext();

  const {
    config: { theme, isRTL }
  } = useAppContext();

  /**
   * Automatically scrolls to the top of the page whenever the pathname changes.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /**
   * Updates the settings panel configuration whenever the RTL (right-to-left) setting changes.
   */
  useEffect(() => {
    setSettingsPanelConfig({
      openSettingPanel: false
    });
  }, [isRTL]);

  return (
    <>
      {!isStylesheetLoaded ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme === 'dark' ? '#000' : '#fff'
          }}
        />
      ) : (
        <>
          <Outlet />
          {/* <PopUp show={false} message={'apple'} description={'apple'} /> */}
        </>
      )}
    </>
  );
};

export default App;
