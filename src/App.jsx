import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<div />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
