import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DynamicNavbar from "@/components/DynamicNavbar";
import Dashboard from "@/components/Dashboard";
import CoursesSection from "@/components/CoursesSection";
import NotesSection from "@/components/NotesSection";
import TestsSection from "@/components/TestsSection";
import ProfilePopup from "@/components/ProfilePopup";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <CoursesSection />;
      case 'notes':
        return <NotesSection />;
      case 'tests':
        return <TestsSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DynamicNavbar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfileClick={() => setIsProfileOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto hide-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <ProfilePopup 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;