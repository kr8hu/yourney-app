//React
import ReactDOM from 'react-dom/client';

//Ionic
import { defineCustomElements } from '@ionic/pwa-elements/loader';

//Styles
import App from './components/App';

//Styles
import './theme.css';
import './index.css';
import './onsenui.css';

//Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

defineCustomElements(window);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);

