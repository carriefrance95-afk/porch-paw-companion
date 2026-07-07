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
import Kitchen from './pages/Kitchen';
import Store from './pages/Store';
import AffiliateHub from './pages/AffiliateHub';
import VetVisitHub from './pages/VetVisitHub';
import AccountSettings from './pages/AccountSettings'; 
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <PetProvider>
        {/* ISOLATED COMPONENT STYLE TARGETING */}
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

          /* 4. CHOP OUT SIDEBAR OVERRIDES - RESTORE NORMAL SIDEBAR LINKS */
          aside a[href="/emergency"] {
            background-color: transparent !important;
            color: #2D2A27 !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0.625rem 1rem !important;
            min-height: auto !important;
          }
          aside a[href="/emergency"]:hover {
            background-color: rgba(45, 42, 39, 0.05) !important;
          }
          aside a[href="/emergency"] * {
            color: #2D2A27 !important;
          }

          /* 5. FIX THE CORNER EMERGENCY HUB BUTTON - SCALE AND ALIGNMENT */
          main a[href="/emergency"],
          .btn[href="/emergency"] {
            background-color: #B55D3B !important;
            color: #FFFFFF !important;
            font-weight: 700 !important;
            border: none !important;
            box-shadow: 0 4px 12px rgba(181, 93, 59, 0.2) !important;
            
            display: inline-flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.5rem !important;
            padding: 0.75rem 2rem !important;
            min-width: 175px !important;
            min-height: 3rem !important;
            border-radius: 9999px !important;
          }

          /* FORCE INTERIOR TOP BUTTON TEXT WHITE */
          main a[href="/emergency"] *,
          .btn[href="/emergency"] * {
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
                <Route path="content" element={<Kitchen />} />
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
