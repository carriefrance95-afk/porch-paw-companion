import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetProvider } from './context/PetContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Profiles from './pages/Profiles';
import HealthWellness from './pages/HealthWellness';
import Reminders from './pages/Reminders';
import Emergency from './pages/Emergency';
import Directory from './pages/Directory';
import JournalMemories from './pages/JournalMemories';
import Travel from './pages/Travel';
import ContentLibrary from './pages/ContentLibrary';
import Store from './pages/Store';
import AffiliateHub from './pages/AffiliateHub';
import VetVisitHub from './pages/VetVisitHub';
import NotFound from './pages/NotFound';

function App() {
  return (
    <PetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="health" element={<HealthWellness />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="directory" element={<Directory />} />
            <Route path="journal" element={<JournalMemories />} />
            <Route path="travel" element={<Travel />} />
            <Route path="content" element={<ContentLibrary />} />
            <Route path="store" element={<Store />} />
            <Route path="partners" element={<AffiliateHub />} />
            <Route path="vet-visit-prep" element={<VetVisitHub />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </PetProvider>
  );
}

export default App;
