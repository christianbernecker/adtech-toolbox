import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import JsonToolsApp from './components/JsonToolsApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/json-explorer" element={<JsonToolsApp />} />
        <Route path="/" element={<Navigate to="/json-explorer" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;