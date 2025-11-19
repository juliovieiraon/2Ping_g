
import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { ProductDemo } from './components/ProductDemo';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ViewType, UserProfile } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-deepDark text-white font-sans selection:bg-hotPink selection:text-white overflow-x-hidden">
      {/* Only show Navbar on Home or Auth screens to allow navigation back */}
      {currentView !== 'dashboard' && (
        <Navbar 
          onOpenSignup={() => setCurrentView('signup')} 
          onOpenLogin={() => setCurrentView('login')}
        />
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
          onSuccess={handleAuthSuccess} 
          onCancel={() => setCurrentView('home')} 
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'login' && (
        <Login 
          onSuccess={handleAuthSuccess} 
          onCancel={() => setCurrentView('home')}
          onSwitchToSignup={() => setCurrentView('signup')}
        />
      )}

      {currentView === 'dashboard' && currentUser && (
        <Dashboard user={currentUser} />
      )}
    </div>
  );
};

export default App;
