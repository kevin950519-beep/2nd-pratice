import { BrowserRouter } from 'react-router-dom';
import { TimelineProvider, TimeThemeProvider } from './components/dynamic-color';
import { CartProvider } from './components/commerce';
import { SharedElementProvider } from './components/motion';
import { AppRoutes } from './pages/AppRoutes';

function App() {
  return (
    <TimelineProvider>
      <TimeThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <SharedElementProvider>
              <AppRoutes />
            </SharedElementProvider>
          </BrowserRouter>
        </CartProvider>
      </TimeThemeProvider>
    </TimelineProvider>
  );
}

export default App;
