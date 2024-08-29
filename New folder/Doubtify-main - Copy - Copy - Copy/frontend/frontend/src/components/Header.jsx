import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';

function Header({ toggleTheme, theme }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const trigger = useRef(null);
  const mobileNav = useRef(null);
  
  // Get the current path
  const location = useLocation();

  // Set active link based on the current path
  useEffect(() => {
    switch (location.pathname) {
      case '/signin':
        setActiveLink('signin');
        break;
      case '/signup':
        setActiveLink('signup');
        break;
      default:
        setActiveLink('');
    }
  }, [location.pathname]);

  // Close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [mobileNavOpen]);

  // Close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [mobileNavOpen]);

  const handleClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <img src="/logo.png" alt="" className="h-8" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center ">
              <li>
                <Link
                  to="/signin"
                  className={`font-medium px-4 py-3 flex items-center transition duration-150 ease-in-out mr-2 ${
                    activeLink === 'signin' ? 'bg-purple-700 text-white' : 'text-purple-600 hover:bg-purple-500 hover:text-white'
                  }`}
                  onClick={() => handleClick('signin')}
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={`font-medium px-4 py-3 flex items-center transition duration-150 ease-in-out ${
                    activeLink === 'signup' ? 'bg-purple-700 text-white' : 'bg-transparent text-purple-600 hover:bg-purple-500 hover:text-white'
                  }`}
                  onClick={() => handleClick('signup')}
                >
                  Sign up
                </Link>
              </li>
              <li>
                <ThemeToggler />
              </li>
            </ul>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && 'active'}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/* Mobile navigation */}
            <nav
              id="mobile-nav"
              ref={mobileNav}
              className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
              style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: 0.8 }}
            >
              <ul className="bg-gray-800 px-4 py-2">
                <li>
                  <Link
                    to="/signin"
                    className={`flex font-medium w-full py-2 justify-center transition duration-150 ease-in-out ${
                      activeLink === 'signin' ? 'bg-purple-700 text-white' : 'text-purple-600 hover:bg-gray-100 hover:text-gray-200'
                    }`}
                    onClick={() => handleClick('signin')}
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className={`font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm transition duration-150 ease-in-out ${
                      activeLink === 'signup' ? 'bg-purple-700 text-white' : 'bg-transparent text-white hover:bg-gray-100'
                    }`}
                    onClick={() => handleClick('signup')}
                  >
                    Sign up
                  </Link>
                </li>
                <li>
                  <button
                    aria-label="Theme toggler"
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-200 dark:bg-gray-800 h-9 dark:text-white"
                  >
                    {theme === 'dark' ? (
                      <img src="/moon.png" alt="Moon Icon" className="w-5 h-5" />
                    ) : (
                      <img src="/brightness.png" alt="Sun Icon" className="w-5 h-5" />
                    )}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
