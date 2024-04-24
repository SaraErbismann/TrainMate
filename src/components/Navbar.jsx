import { useState } from 'react';
import {
    AppBar, Toolbar, IconButton, 
    Typography, Menu, MenuItem, 
    Container, Stack
}  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';


export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };


  return (
    <div className='App'>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/trainings"} style={{ textDecoration: 'none', color: 'inherit' }}>Trainings</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to={"/customers"} style={{ textDecoration: 'none', color: 'inherit' }}>Customers</Link>
              </MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TrainMate
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
              <Link to={"/trainings"} style={{ textDecoration: 'none', color: 'inherit' }}>Trainings</Link>
              <Link to={"/customers"} style={{ textDecoration: 'none', color: 'inherit' }}>Customers</Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </div>
  );
}