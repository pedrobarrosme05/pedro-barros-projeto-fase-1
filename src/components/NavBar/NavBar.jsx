import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme as useMuiTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Add as AddIcon,
  List as ListIcon,
  MovieFilter as MovieIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { toggleTheme, isDark } = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { path: '/', label: 'Início', icon: <HomeIcon /> },
    { path: '/sobre', label: 'Sobre', icon: <InfoIcon /> },
    { path: '/cadastrar', label: 'Cadastrar Série', icon: <AddIcon /> },
    { path: '/series', label: 'Listar Séries', icon: <ListIcon /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <MovieIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 600,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            SeriesManager
          </Typography>
        </Box>

        {/* Theme Toggle Button */}
        <Tooltip title={isDark ? 'Modo Claro' : 'Modo Escuro'}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{ mr: 1 }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  bgcolor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              edge="end"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                  selected={isActive(item.path)}
                  sx={{ minWidth: 200 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.icon}
                    {item.label}
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;