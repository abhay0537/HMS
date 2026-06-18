import React from "react";
import { Drawer, List, Divider, IconButton, Box, Avatar, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/Loginslice";
import { useNavigate } from "react-router-dom";

const mainLinks = [
  { label: "Home", to: "/" },
  { label: "Doctors", to: "/doctor" },
  { label: "Services", to: "/services" },
  { label: "Ambulance", to: "/ambulance-booking" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Drawor = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  const isAdmin = localStorage.getItem("is_admin");
  const username = localStorage.getItem("user");
  const isLoggedIn = Boolean(jwt) && isAdmin === "false";

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/");
    window.location.reload();
  };

  const renderLink = (item) => (
    <ListItemButton key={item.to} component={Link} to={item.to} onClick={() => setOpen(false)}>
      <ListItemText primary={item.label} />
    </ListItemButton>
  );

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, py: 1 }}>
          {/* Auth header */}
          {isLoggedIn && (
            <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ width: 36, height: 36 }} />
              <Typography variant="subtitle2" noWrap>
                {username || "Account"}
              </Typography>
            </Box>
          )}

          <List>{mainLinks.map(renderLink)}</List>
          <Divider />

          {isLoggedIn ? (
            /* Logged-in account links */
            <List>
              <ListItemButton component={Link} to="/appointment" onClick={() => setOpen(false)}>
                <PersonIcon fontSize="small" sx={{ mr: 1.5 }} />
                <ListItemText primary="Appointments" />
              </ListItemButton>
              <ListItemButton component={Link} to="/userprofile" onClick={() => setOpen(false)}>
                <PersonIcon fontSize="small" sx={{ mr: 1.5 }} />
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          ) : (
            /* Guest links */
            <List>
              {[
                { label: "User Login", to: "/login" },
                { label: "Doctor Login", to: "/doctorlogin" },
                { label: "Sign Up", to: "/SignUp" },
              ].map(renderLink)}
            </List>
          )}
        </Box>
      </Drawer>

      <IconButton className="mobile-menu-button" onClick={() => setOpen(true)} aria-label="Open menu">
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawor;
