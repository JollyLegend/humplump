import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import favicon from '../favicon.png';

// Set favicon dynamically
const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
(link as HTMLLinkElement).rel = 'icon';
(link as HTMLLinkElement).href = favicon;
document.getElementsByTagName('head')[0].appendChild(link);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
