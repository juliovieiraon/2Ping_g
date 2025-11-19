
import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { ProductDemo } from './components/ProductDemo';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { ViewType, UserProfile } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const handleSignupSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-deepDark text-white font-sans selection:bg-hotPink selection:text-white overflow-x-hidden">
      {/* Only show Navbar on Home or Signup to avoid clutter on Dashboard, or keep it but changing actions */}
      {currentView !== 'dashboard' && (
        <Navbar onOpenSignup={() => setCurrentView('signup')} />
      )}

      {currentView === 'home' && (
        <>
          <Hero />
          <Features />
          <ProductDemo />
        </>
      )}

      {currentView === 'signup' && (
        <Signup 
          onSuccess={handleSignupSuccess} 
          onCancel={() => setCurrentView('home')} 
        />
      )}

      {currentView === 'dashboard' && currentUser && (
        <Dashboard user={currentUser} />
      )}
    </div>
  );
};

export default App;
