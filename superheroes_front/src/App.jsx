import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import EditPage from './pages/EditPage';
import CreatePage from './pages/CreatePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hero/:id" element={<DetailsPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
