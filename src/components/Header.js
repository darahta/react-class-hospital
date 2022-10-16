import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "..//assets/styles/generalStyle.css";

const Header = () => {
   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  HOSPITAL
               </Typography>
               <div style={{ display: "flex", gap: "20px" }}>
                  <Link className="menuLink" to="/">
                     Anasayfa
                  </Link>
                  <Link className="menuLink" to="/hastalar">
                     Hastalar
                  </Link>
               </div>
            </Toolbar>
         </AppBar>
      </Box>
   );
};

export default Header;
