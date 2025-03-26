
import ThemeInitializer from '../ui/ThemeInitializer';
import BottomNavigation from '../nav/BottomNav';
import { useLocation } from 'react-router-dom';


const Layout = ({ children }) => {
  const location = useLocation().pathname;

  const visibleBottomNav = ['/', '/stats']
  
  return (
    <div className="w-full overflow-x-clip z-10 bg-surface min-h-screen text-text pb-24">
      <ThemeInitializer />
      <main className="">
        {children}
      </main>
      
      
      {/* Conditionally render BottomNavigation */}
      {visibleBottomNav.includes(location) && <BottomNavigation />}
    </div>
  );
};

export default Layout;