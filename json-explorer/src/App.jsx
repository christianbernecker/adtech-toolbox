import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import JsonToolsApp from './components/JsonToolsApp';
import MainLayout from './components/layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/json-explorer" element={<JsonToolsApp />} />
          <Route index element={<Navigate to="/json-explorer" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;