import React, { useState } from 'react';
import Topbar from "./components/navbar/Topbar";
import Sidebar1 from "./components/navbar/Sidebar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import EditProfile from './components/EditProfile';
import Users from './components/Users';
import { Routes, Route } from 'react-router-dom';
import Report from './components/Report';
import Profile from './components/Profile';

const DDashboardInner = () => {
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
            <Route path="/" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/report/:id" element={<Report />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const DDashboard = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DDashboardInner />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DDashboard;
