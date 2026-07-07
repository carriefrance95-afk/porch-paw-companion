import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetProvider } from './context/PetContext';
import { AuthProvider } from './context/AuthContext';
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
import AccountSettings from './pages/AccountSettings'; 
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <PetProvider>
        <style dangerouslySetInnerHTML={{__html: `
          /* 1. FORCE SIDEBAR LIGHT CREAM BACKGROUND */
          aside, .drawer-side, [class*="drawer-side"], .bg-base-200, .bg-neutral {
            background-color: #F4F0EA !important;
          }
          
          /* 2. FORCE MENU TEXT TO DARK CHOCOLATE CHARCOAL */
          aside a, .drawer-side a, aside span, aside p, aside h1 {
            color: #2D2A27 !important;
          }
          
          /* 3. ACTIVE DASHBOARD ITEM BACKGROUND */
          aside a[href="/"].bg-\\[\\#B55D3B\\], 
          aside a.bg-primary {
            background-color: #B55D3B !important;
            color: #FFFFFF !important;
          }
          aside a[href="/"] span {
            color: inherit !important;
          }

          /* 4. EMERGENCY HUB BUTTON ALIGNMENT & PADDING FIX */
          a[href="/emergency"], 
          .emergency-hub-btn, 
          [class*="emergency"],
          button[class*="bg-\\[\\#B55D3B\\]"],
          a[class*="bg-\\[\\#B55D3B\\]"] {
            background-color: #B55D3B !important;
            color: #FFFFFF !important;
            font-weight: 700 !important;
            border: none !important;
            box-shadow: 0 4px 12px rgba(181, 93, 59, 0.2) !important;
            
            /* FORCES VERTICAL CENTERING AND ADDS CUSHION AT THE BOTTOM */
            display: inline-flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0.6rem 1.5rem 0.7rem 1.5rem !important;
            line-height: 1.2 !important;
            min-height: 3.5rem !important;
          }

          /* FORCE THE INSIDE TEXT AND ICONS WHITE */
          a[href="/emergency"] *, 
          .emergency-hub-btn *, 
          [class*="emergency"] * {
            color: #FFFFFF !important;
          }
        `}} />

        <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF7', color: '#2D2A27' }}>
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
                <Route path="account" element={<AccountSettings />} /> 
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </PetProvider>
    </AuthProvider>
  );
}

export default App;