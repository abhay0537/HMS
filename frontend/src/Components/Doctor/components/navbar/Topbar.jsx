import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack, PersonOutline, MenuOutlined } from "@mui/icons-material";

const Topbar = ({ onMobileMenuToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isMobile && (
          <IconButton onClick={onMobileMenuToggle} aria-label="Open menu">
            <MenuOutlined />
          </IconButton>
        )}
        <IconButton onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowBack />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex" }}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <PersonOutline />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
        >
          <MenuItem
            onClick={() => {
              localStorage.clear();
              navigate("/");
              window.location.reload(true);
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
