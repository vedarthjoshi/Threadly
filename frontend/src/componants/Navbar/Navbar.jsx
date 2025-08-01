import { useState } from 'react';


const Navbar = ({ activeSection, setActiveSection }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const navItems = [
    { id: 'index', label: 'Index' },
    { id: 'post', label: 'Post'},
    { id: 'notifications', label: 'Notifications' },
    { id: 'account', label: 'Account'},
    { id: 'search', label: 'Search' }
  ];

  return (
    <div 
      className={`
        bg-black font-virgil text-white h-screen fixed left-0 top-0 pt-20 shadow-lg z-20
        transition-all duration-300 ease-in-out
        ${isHovered ? 'w-1/8' : 'w-0'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center justify-center mt-15 space-y-12 ">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`
              relative cursor-pointer  p-3 rounded-lg transition-all duration-300 ease-in-out
             
              ${activeSection === item.id ? 'bg-slate-700 shadow-md' : ''}
              group
            `}
          >

          <div className="flex items-center space-x-3">
              <span className={`
                font-medium group-hover:text-pink-400 transition-all duration-300 whitespace-nowrap
                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
              `}>
                {item.label}
              </span>
            </div>
            
            {/* Animated underline */}
            <div className={`
              absolute bottom-0 left-2 right-2 h-0.5 bg-pink-300 transform origin-left transition-transform duration-300
              ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
            `}></div>
            
            {/* Tooltip for collapsed state */}
            {!isHovered && (
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-slate-700 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar