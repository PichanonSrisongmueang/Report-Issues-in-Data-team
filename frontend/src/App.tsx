import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Home from "./components/Home";
import HomeAdmin from "./components/HomeAdmin";
import Users from "./components/Users";
import UserCreate from "./components/UserCreate";
// import WatchVideos from "./components/WatchVideos";
// import WatchVideoCreate from "./components/WatchVideoCreate";
import IssueCreate from "./components/Issue_Create";
import Issues from "./components/Issue_User";
import SignIn from "./components/SignIn";
// import SignIn_admin from "./components/SignIn_admin";
import { UsersInterface } from "./interfaces/Idim_User";
import Issue_Update from "./components/Issue_Update";
import Issues_Admin from "./components/Issue_Admin";
import IssueDetail from "./components/Issue_Detail";
import UserUpdate from "./components/UserUpdate";
import ProjectCreate from "./components/ProjectCreate";
import { Login_admin, UpdateUser } from "./services/HttpClientService";
import { Menu, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GetUserByID } from "./services/HttpClientService";
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();


const menu = [
  //Admin
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/admin", role: "user" },
  // { name: "สมาชิก", icon: <PeopleIcon />, path: "/users", role: "user" },
  {
    name: "ปัญหาที่แจ้งเข้ามา",
    icon: <ContactSupportIcon />,
    path: "/issues/admin",
    role: "user",
  },

  //User
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/", role: "employee" },
  // { name: "สมาชิก", icon: <PeopleIcon />, path: "/users", role: "employee" },
  // {
  //   name: "แจ้งปัญหา",
  //   icon: <ContactSupportIcon />,
  //   path: "/issues",
  //   role: "employee",
  // },
];



function App() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String | null>("");
  const [open, setOpen] = React.useState(true);
  const [users, setUsers] = useState<UsersInterface>();
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openn = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUser = async () => {
    // const uid = Number(localStorage.getItem("uid"));
    let res = await GetUserByID();
    if (res) {
      setUsers(res);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setToken(token);
      setRole(role);
    }
    getUser();
  }, []);

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const home = () => {
    window.location.href = "/";
  };

  const homeAdmin = () => {
    window.location.href = "/admin";
  };

  const editProfile = () => {
    window.location.href = "/users";
  };


  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar className="Navbar" position="absolute" >
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              {/* <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton> */}
              <IconButton
                edge="start"
                onClick={home}

                sx={{
                  marginRight: "10px", color: "#F4EEA9",
                  ...(open && { display: "flex" }),
                }}
              >
                <HomeIcon />
              </IconButton>
              <IconButton
                edge="start"
                onClick={homeAdmin}

                sx={{
                  marginRight: "36px", color: "#519259",
                  ...(open && { display: "contents" }),
                }}
              >
                <HomeIcon />
              </IconButton>

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}

              >
                แจ้งปัญหาข้อมูลไม่ตรงกันระหว่าง Qlikview และ PowerBI
              </Typography>
              

              <div>
              
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: '#F4EEA9' }}
                > 
                {/* {`${users?.Name}`} [{`${users?.Department}`}] */}
                  <IconButton
                  sx={{
                    marginRight: "10px", color: "#F4EEA9",
                    ...(open && { display: "flex" }),
                  }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Button>
                
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={editProfile}>Edit Profile</MenuItem>
                  <MenuItem onClick={signout}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          {/* <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map(
                (item, index) =>
                  role === item.role && (
                    <Link
                      to={item.path}
                      key={item.name}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem button>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    </Link>
                  )
              )}
            </List>
          </Drawer> */}
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<HomeAdmin />} />
                <Route path="/user" element={<Users />} />
                <Route path="/user/create" element={<UserCreate />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/issues/admin" element={<Issues_Admin />} />
                <Route path="/issue/create" element={<IssueCreate />} />
                <Route path="/issue/update" element={<Issue_Update />} />
                <Route path="/issue/detail" element={<IssueDetail />} />
                <Route path="/users" element={<UserUpdate />} />
                <Route path="/projects" element={<ProjectCreate />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;