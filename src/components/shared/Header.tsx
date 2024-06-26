"use client";
import { useState, MouseEvent, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Stack } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import axios from "axios";
import SignInButton from "../buttons/SignInButton";
import Cookies from "js-cookie";

const pages = ["Create"];
const settings = ["Logout"];

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const {
        user,
        login,
        logout,
        setRefreshToken,
        setAccessToken,
        isAuthenticated,
        setIsAuthenticated,
    } = useAuth();

    // Login
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const { code } = tokenResponse;
            try {
                const tokenRes = await axios.post(
                    `${SERVER_URL}/auth/create-tokens`,
                    { code }
                );

                const { jwtToken, tokens } = tokenRes.data;
                const { access_token, refresh_token } = tokens;
                setRefreshToken(refresh_token);
                setAccessToken(access_token);

                localStorage.setItem("jwtToken", jwtToken);

                setIsAuthenticated(true);

                const userInfoResponse = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
                );

                login(userInfoResponse.data);
            } catch (error) {
                console.error("Error:", error);
            }
        },
        flow: "auth-code",
        scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
    });

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            setIsAuthenticated(true);
            // Optionally, fetch user info with the JWT token here
        }
    }, []);

    // Logout
    const router = useRouter();

    const handleGoogleLogout = () => {
        setIsAuthenticated(false);
        logout();
        handleCloseUserMenu();
        router.push("/");
    };

    return (
        <AppBar position="static">
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {user && (
                            <>
                                {pages.map((page) => (
                                    <Link href="/" key={page}>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                my: 2,
                                                color: "white",
                                                display: "block",
                                            }}
                                            disableRipple
                                        >
                                            {page}
                                        </Button>
                                    </Link>
                                ))}
                            </>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            {!user ? (
                                <SignInButton
                                    handleSignIn={handleGoogleLogin}
                                />
                            ) : (
                                <>
                                    <Typography variant="body1">
                                        Hi, {user?.name}
                                    </Typography>
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={user?.picture}
                                        />
                                    </IconButton>
                                </>
                            )}
                        </Stack>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleGoogleLogout}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
