import React, { useState } from 'react';
import Topbar from "./components/navbar/Topbar";
import Sidebar1 from "./components/navbar/Sidebar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import Doctors from './components/Doctors';
import Users from './components/Users';
import { Routes, Route } from 'react-router-dom';
import Enquery from './components/Enquiry';
import Ambulance from './components/Ambulance';
import Report from './components/Report';
import Services from './components/Services';

const DashboardInner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar1
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          background: '#ffffff',
          color: '#111827',
        }}
      >
        <main className="content" style={{ flex: 1, background: '#ffffff', color: '#111827' }}>
          <Topbar onMobileMenuToggle={() => setMobileOpen(true)} />
          <Routes>
            <Route path="/" element={<Doctors />} />
            <Route path="/users" element={<Users />} />
            <Route path="/enquery" element={<Enquery />} />
            <Route path="/ambulance" element={<Ambulance />} />
            <Route path="/services" element={<Services />} />
            <Route path="/report/:id" element={<Report />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DashboardInner />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dashboard;
