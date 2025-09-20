import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, FileText, Target, Home, User } from "lucide-react";
import { useState } from "react";

interface DynamicNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onProfileClick: () => void;
}

const DynamicNavbar = ({ activeTab, onTabChange, onProfileClick }: DynamicNavbarProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'tests', label: 'Tests', icon: Target },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="backdrop-blur-2xl sticky top-0 z-50 px-4 sm:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        {/* Dynamic Island Navigation */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10 px-3 py-2 rounded-full flex items-center space-x-1 border border-primary/20 shadow-lg shadow-primary/10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-3 sm:px-4 py-2 rounded-full flex items-center space-x-2 transition-smooth ${
                  isActive 
                    ? 'text-primary-foreground bg-primary/80 shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full shadow-glow"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="text-sm font-medium relative z-10 hidden sm:block">
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Profile Avatar - Absolute positioned */}
        <motion.button
          onClick={onProfileClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-0 transition-smooth"
        >
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-primary/20 shadow-md">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="backdrop-blur-lg bg-surface/60 text-foreground">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </AvatarFallback>
          </Avatar>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default DynamicNavbar;