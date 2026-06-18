import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, useMediaQuery, Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";
import { Edit, HelpOutlined, MenuOutlined } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected, onNavigate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => {
        setSelected(title);
        if (onNavigate) onNavigate();
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarContent = ({ isCollapsed, setIsCollapsed, selected, setSelected, onNavigate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Navigate = useNavigate();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": { background: `${colors.primary[400]} !important` },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#868dfb !important" },
        "& .pro-menu-item.active": { color: "#6870fa !important" },
        minHeight: "100vh",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography
                  variant="h3"
                  onClick={() => Navigate("/")}
                  color={colors.grey[100]}
                  sx={{ cursor: "pointer" }}
                >
                  Doctor Panel
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Users" to="/Users" icon={<HelpOutlined />} selected={selected} setSelected={setSelected} onNavigate={onNavigate} />
            <Item title="Edit Profile" to="/editprofile" icon={<Edit />} selected={selected} setSelected={setSelected} onNavigate={onNavigate} />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

const Sidebar1 = ({ mobileOpen, onMobileClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box" },
        }}
      >
        <SidebarContent
          isCollapsed={false}
          setIsCollapsed={() => {}}
          selected={selected}
          setSelected={setSelected}
          onNavigate={onMobileClose}
        />
      </Drawer>
    );
  }

  return (
    <SidebarContent
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export default Sidebar1;
