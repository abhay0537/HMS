import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Drawor from "./Drawor";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/Loginslice";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Doctors", to: "/doctor" },
  { label: "Services", to: "/services" },
  { label: "Ambulance", to: "/ambulance-booking" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginAnchorEl, setLoginAnchorEl] = useState(null);

  const item = localStorage.getItem("jwt");
  const isAdmin = localStorage.getItem("is_admin");
  const openProfileMenu = Boolean(anchorEl);
  const openLoginMenu = Boolean(loginAnchorEl);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <AppBar position="sticky" elevation={0} className="site-header">
      <Toolbar className="nav-toolbar">
        <Button component={Link} to="/" className="brand-button">
          <Avatar className="brand-mark">H</Avatar>
          <Box component="span" className="brand-text">
            Health Haven
          </Box>
        </Button>

        {isMatch ? (
          <Drawor />
        ) : (
          <>
            <Box component="nav" className="nav-links">
              {navItems.map((item) => (
                <Button key={item.to} component={NavLink} to={item.to}>
                  {item.label}
                </Button>
              ))}
            </Box>

            <Box className="nav-actions">
              {item && isAdmin === "false" ? (
                <>
                  <Tooltip title={localStorage.getItem("user") || "Account"}>
                    <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
                      <Avatar />
                    </Button>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={openProfileMenu}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem component={NavLink} to="/appointment" onClick={() => setAnchorEl(null)}>
                      Appointments
                    </MenuItem>
                    <MenuItem component={NavLink} to="/userprofile" onClick={() => setAnchorEl(null)}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={(event) => setLoginAnchorEl(event.currentTarget)}
                  >
                    Login
                  </Button>
                  <Menu
                    anchorEl={loginAnchorEl}
                    open={openLoginMenu}
                    onClose={() => setLoginAnchorEl(null)}
                  >
                    <MenuItem component={NavLink} to="/login" onClick={() => setLoginAnchorEl(null)}>
                      User Login
                    </MenuItem>
                    <MenuItem component={NavLink} to="/doctorlogin" onClick={() => setLoginAnchorEl(null)}>
                      Doctor Login
                    </MenuItem>
                  </Menu>
                  <Button variant="contained" component={Link} to="/SignUp">
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
