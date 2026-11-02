import React, { useState, useEffect } from 'react';
import { NavTab, Language, Theme } from './types';
import { sound } from './services/sound';
import { Navbar } from './components/Navbar';
import { HeroCommandCenter } from './components/HeroCommandCenter';
import { TruthScanner } from './components/TruthScanner';
import { NyayaAI } from './components/NyayaAI';
import { AICourtroom } from './components/AICourtroom';
import { ConsumerRadar } from './components/ConsumerRadar';
import { ScamSurvival } from './components/ScamSurvival';
import { MoneyDetective } from './components/MoneyDetective';
import { ComplaintGenerator } from './components/ComplaintGenerator';
import { RightsUniverse } from './components/RightsUniverse';
import { UserDashboard } from './components/UserDashboard';
import { CommandPalette } from './components/CommandPalette';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { OfficialResourcesModal } from './components/OfficialResourcesModal';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('nyayaverse_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.enabled);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [dailyChallengeOpen, setDailyChallengeOpen] = useState<boolean>(false);
  const [officialResourcesOpen, setOfficialResourcesOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // Cross-tool shared context
  const [searchContext, setSearchContext] = useState<string>('');
  const [complaintInitialData, setComplaintInitialData] = useState<any>(null);

  // Sync theme with documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('nyayaverse_theme', theme);
  }, [theme]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: NavTab, initialQuery?: string) => {
    sound.playClick();
    if (initialQuery) {
      setSearchContext(initialQuery);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToComplaint = (data?: any) => {
    sound.playClick();
    if (data) {
      setComplaintInitialData(data);
    }
    setCurrentTab('complaint-generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const nextState = sound.toggleSound();
    setSoundEnabled(nextState);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleToggleTheme = () => {
    sound.playClick();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#030712] text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col font-sans transition-colors duration-200 selection:bg-cyan-500/30 selection:text-cyan-200`}>
      {/* Futuristic Command Center Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenDailyChallenge={() => setDailyChallengeOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenOfficialResources={() => setOfficialResourcesOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HeroCommandCenter
            onNavigate={handleNavigate}
            language={language}
            onOpenDailyChallenge={() => setDailyChallengeOpen(true)}
          />
        )}

        {currentTab === 'truth-scanner' && (
          <TruthScanner
            initialQuery={searchContext}
            onNavigateToComplaint={handleNavigateToComplaint}
          />
        )}

        {currentTab === 'nyaya-ai' && (
          <NyayaAI
            initialQuery={searchContext}
            onNavigateToComplaint={handleNavigateToComplaint}
          />
        )}

        {currentTab === 'courtroom' && <AICourtroom />}

        {currentTab === 'radar' && <ConsumerRadar />}

        {currentTab === 'scam-survival' && <ScamSurvival />}

        {currentTab === 'money-detective' && (
          <MoneyDetective
            initialQuery={searchContext}
            onNavigateToComplaint={handleNavigateToComplaint}
          />
        )}

        {currentTab === 'complaint-generator' && (
          <ComplaintGenerator initialData={complaintInitialData} />
        )}

        {currentTab === 'rights' && <RightsUniverse />}

        {currentTab === 'dashboard' && (
          <UserDashboard onNavigateToTab={(tab) => handleNavigate(tab)} />
        )}
      </main>

      {/* Global Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectTab={(tab, query) => handleNavigate(tab, query)}
      />

      <DailyChallengeModal
        isOpen={dailyChallengeOpen}
        onClose={() => setDailyChallengeOpen(false)}
      />

      <OfficialResourcesModal
        isOpen={officialResourcesOpen}
        onClose={() => setOfficialResourcesOpen(false)}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Global Footer */}
      <Footer
        onSelectTab={(tab) => handleNavigate(tab)}
        onOpenOfficialResources={() => setOfficialResourcesOpen(true)}
      />
    </div>
  );
}
