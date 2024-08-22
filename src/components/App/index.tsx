//React
import { useEffect } from 'react';

//Capacitor
import { StatusBar } from '@capacitor/status-bar';

//Context
import { AppProvider } from '../../context/App';
import { UserProvider } from '../../context/User';
import { ModalProvider } from '../../context/Modal';
import { DialogProvider } from '../../context/Dialog';

//Onsen UI
import ons from 'onsenui';

//Components
import Navigator from './Navigator';


/**
 * App 
 * 
 * Fő komponens
 * 
 * @returns 
 */
function App() {

  useEffect(() => {
    setOnsenFunctions();
    setStatusBarColor();
  }, []);


  /**
   * setOnsenFunctions
   * 
   */
  const setOnsenFunctions = () => {
    ons.ready(() => {
      //Android Back Button inaktiválása
      ons.disableDeviceBackButtonHandler();
    });
  }


  /**
   * changeStatusBar
   * 
   */
  const setStatusBarColor = () => {
    StatusBar.setBackgroundColor({
      color: "#4e651a"
    });
  }


  return (
    <AppProvider>
      <UserProvider>
        <DialogProvider>
          <ModalProvider>
            <Navigator />
          </ModalProvider>
        </DialogProvider>
      </UserProvider>
    </AppProvider>
  );
}

export default App;
