import { useState } from 'react';
import {
    AppBar, Toolbar, IconButton, 
    Typography, Menu, MenuItem, 
    Container, Stack, useMediaQuery
}  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';

export default function Navbar() {
    
    //Sate to manage anchor element for responsive menu
    const [anchorElNav, setAnchorElNav] = useState(null);

    //Media query to check if screen size is mobile for responsive menu
    const isMobile = useMediaQuery('(max-width:600px)');

    //handling opening responive navv menu
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    //handle closing responsive nav menu
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <div className='App'>
            {/* App bar start */}
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* If screen is mobile, render menu icon */}
                        {isMobile && (
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
                        )}
                        {/* Mobile nav menu */}
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
                            {/* Mobile menu items */}
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
                        {/* App name in menu */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            TrainMate
                        </Typography>
                        {/* Nav links in desktop */}
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            <Typography style={{ textDecoration: 'none', color: 'inherit' }} variant="body1" component={Link} to={"/"}>Home</Typography>
                            <Typography style={{ textDecoration: 'none', color: 'inherit' }} variant="body1" component={Link} to={"/trainings"}>Trainings</Typography>
                            <Typography style={{ textDecoration: 'none', color: 'inherit' }} variant="body1" component={Link} to={"/customers"}>Customers</Typography>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </div>
    );
}