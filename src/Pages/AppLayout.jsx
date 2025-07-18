import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import HamburgerMenu from '../components/HamburgerMenu';
import { Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 900); // mobile & tablet
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 900);
      if (window.innerWidth > 900) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change (compact)
  useEffect(() => {
    if (isCompact) setSidebarOpen(false);
  }, [location.pathname, isCompact]);

  return (
    <div>
      {(isCompact ? sidebarOpen : true) && (
        <Sidebar isOpen={isCompact ? sidebarOpen : true} onClose={() => setSidebarOpen(false)} isCompact={isCompact} />
      )}
      {isCompact && !sidebarOpen && (
        <HamburgerMenu onClick={() => setSidebarOpen(true)} />
      )}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
