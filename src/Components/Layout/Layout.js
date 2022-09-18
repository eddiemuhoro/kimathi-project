import { AppBar, Box, Button, IconButton, Menu, Toolbar, Typography } from "@material-ui/core";
import { Outlet, Link } from "react-router-dom";
import { useUserContext } from "../Authentication/context/userContext";

const Layout = () => {
  const {logoutUser}= useUserContext();
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Post</Link>
          </li>
        </ul>
      </nav> */}
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
        <Typography  variant="body" component="div" sx={{ flexGrow: 1 }}>
                <Link style={{color: 'white', textDecoration: 'none', marginRight: '20px'}} to="/">Events</Link>
        </Typography>

          <Typography variant="body" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{color: 'white', textDecoration: 'none', marginRight: '20px'}} to="/resource">Resources</Link>
          </Typography>

          <Typography variant="body" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{color: 'white', textDecoration: 'none'}} to="/news">News</Link>
          </Typography>


         <Button style={{marginLeft: '20px', color:'wheat'}} onClick={logoutUser}>Log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Outlet />
    </>
  )
};

export default Layout;