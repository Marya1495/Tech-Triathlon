import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen bg-coder-dark text-coder-green font-mono">
      {/* Code Rain Background Effect */}
      <div className="fixed inset-0 code-rain pointer-events-none z-0"></div>
      
      {/* Header */}
      <motion.header 
        initial={{ y: -50 }} 
        animate={{ y: 0 }} 
        className="bg-coder-gray p-4 shadow-lg glow z-10 relative"
      >
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-coder-blue transition">Error Out</Link>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:glow">Home</Link></li>
            <li><Link to="/details" className="hover:glow">Event Details</Link></li>
            <li><Link to="/submit" className="hover:glow">Submit</Link></li>
            <li><Link to="/resources" className="hover:glow">Resources</Link></li>
            <li><Link to="/leaderboard" className="hover:glow">Leaderboard</Link></li>
            <li><Link to="/forum" className="hover:glow">Forum</Link></li>
            <li><Link to="/about" className="hover:glow">About</Link></li>
          </ul>
        </nav>
      </motion.header>
      
      {/* Main Content */}
      <main className="relative z-10 p-8">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-coder-gray p-4 text-center glow relative z-10">
        <p>&copy; 2023 Error Out. Contact: info@errorout.com</p>
      </footer>
    </div>
  );
};

export default Layout;