import React, { Suspense, useEffect } from 'react';
import { NotificationButton } from './notifications/NotificationButton';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from "./components/layout/layout";
import ActivityPage from './components/mood/ActivitySelection';

import EntriesPage from './pages/Entries';
import SettingsPage from './pages/SettingsPage';
import StatsPage from './pages/StatsPage';
import ViewSpecificJournal from './components/journal/ViewSpecificJournal';

function App() {

  

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      // Store the event for later use
      const installButton = document.getElementById('install-button');
      if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', () => {
          e.prompt();
        });
      }
    });
  }, []);
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      
      <Layout>
        <Routes>
          <Route path="/" element={<EntriesPage />}/>
          <Route path="/set-activity/:mood" element={<ActivityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:id" element={<ViewSpecificJournal />} />
          
        </Routes>
        
      </Layout>
    </Suspense>
  );
}

export default App;
