import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TimelineProvider, TimeThemeProvider } from './components/dynamic-color';
import { FloatingTimelineControl } from './components/input/FloatingTimelineControl';
import { AppShell } from './components/layout/AppShell';

function App() {
  return (
    <TimelineProvider>
      <TimeThemeProvider>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<div />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
        <FloatingTimelineControl />
      </TimeThemeProvider>
    </TimelineProvider>
  );
}

export default App;
