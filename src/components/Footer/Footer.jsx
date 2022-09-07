import React from "react";
import { makeStyles, Container, Grid, Link, Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { createSvgIcon } from '@mui/material/utils';
import {
  Instagram,
  Twitter,
  YouTube,
  LinkedIn,
  Copyright,
} from "@material-ui/icons";

import TFooter from "./FooterT"

import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  icon: {
    marginRight: "10px",
    marginLeft: "20px",
    [theme.breakpoints.up("md")]: {
      marginLeft: "0px",
    },
  },
  typography: {
    textDecoration: "none",
    color: "white ",
    "&:hover": {
      color: "#AED6F1",
    },
  },
  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: "10px",
  },
  container: {
    width: "33%",
    minWidth: "300px",
    border: "1px solid red",
  },
  gridContainer: {
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  gridSocialContainer: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  copyright: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  footerHead: {
    fontWeight: "bolder",
    padding: "20px 0",
  },
}));

const Footer = () => {
  
  const DiscordIcon = createSvgIcon(
    <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 640 512">
<path fill="white" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/>
</svg>
  );
  const classes = useStyles();
  const location = useLocation();

  if(location.pathname !== '/' && location.pathname !== "/auth/devlogin" && location.pathname !== "/auth/devsignup" && location.pathname !== "/profile" && location.pathname !== "/jobspage" && location.pathname !== "/internships" && location.pathname !== "/terms" && location.pathname !== "/contactus" && location.pathname !== "/aboutus" && location.pathname !== "/dcma" && location.pathname !== "/privacy" && location.pathname !== "/jobapplication"){
    return (
      <>
        <footer className={classes.footer}>
          <div>
            <Container>
              <div className={classes.mainContainer}>
                <Grid container spacing={5}>
                  <Grid
                    className={classes.gridContainer}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <Typography
                      className={`${classes.typography}, ${classes.footerHead}`}
                      variant="h5"
                    >
                      About
                    </Typography>
                    <Link
                      href="/aboutus"
                      color="inherit"
                      underline="none"
                      className={classes.typography}
                    >
                      <Typography variant="h6" className={classes.typography}>
                        About us
                      </Typography>
                    </Link>
                    <Link
                      href="/terms"
                      color="inherit"
                      underline="none"
                      className={classes.typography}
                    >
                      <Typography variant="h6" className={classes.typography}>
                        Terms and Conditions
                      </Typography>
                    </Link>
                    <Link
                      href="/privacy"
                      color="inherit"
                      underline="none"
                      className={classes.typography}
                    >
                      <Typography variant="h6" className={classes.typography}>
                        Privacy
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid
                    className={classes.gridContainer}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <Typography
                      className={`${classes.typography}, ${classes.footerHead}`}
                      variant="h5"
                    >
                      Support
                    </Typography>
                    <Link
                      href="/contactus"
                      color="inherit"
                      underline="none"
                      className={classes.typography}
                    >
                      <Typography variant="h6" className={classes.typography}>
                        Contact
                      </Typography>
                    </Link>
                    <Link
                      href="https://discord.gg/wFNW6Hd2yU"
                      target="_blank"
                      color="inherit"
                      underline="none"
                      className={classes.typography}
                    >
                      <Typography variant="h6" className={classes.typography}>
                        <DiscordIcon className={classes.icon} />
                        Discord
                      </Typography>
                    </Link>
                    <Link
                      target="_blank"
                      href="/dcma"
                      color="inherit"
                      underline="none"
                      className={classes.typography}
                    >
                      <Typography variant="h6" className={classes.typography}>
                        DCMA
                      </Typography>
                    </Link>
                    {/* <Link
                      href="/generalQueries"
                      color="inherit"
                      underline="none"
                      className={classes.typography}
                    >
                      <Typography variant="h6" className={classes.typography}>
                        General Queries
                      </Typography>
                    </Link> */}
                  </Grid>
                  <Grid
                    className={classes.gridContainer}
                    item
                    xs={12}
                    sm={12}
                    md={4}
                  >
                    <Typography
                      className={`${classes.typography}, ${classes.footerHead}`}
                      variant="h5"
                    >
                      Social Media Handles
                    </Typography>
                    <Box className={classes.gridSocialContainer}>
                      <Link
                        href="https://www.instagram.com/cryptonaukri/"
                        target="_blank"
                        color="inherit"
                        underline="none"
                        className={classes.typography}
                      >
                        <Typography variant="h6" className={classes.typography}>
                          <Instagram className={classes.icon} />
                          Instagram
                        </Typography>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/company/cryptonaukri/"
                        target="_blank"
                        color="inherit"
                        underline="none"
                        className={classes.typography}
                      >
                        <Typography variant="h6" className={classes.typography}>
                          <LinkedIn className={classes.icon} />
                          LinkedIn
                        </Typography>
                      </Link>
                      <Link
                        href="https://twitter.com/CryptoNaukri"
                        target="_blank"
                        color="inherit"
                        underline="none"
                        className={classes.typography}
                      >
                        <Typography variant="h6" className={classes.typography}>
                          <Twitter className={classes.icon} />
                          Twitter
                        </Typography>
                      </Link>
                      <Link
                        href="https://www.youtube.com/channel/UCj-OThZ-RvEXqmscW4SKLRg"
                        target="_blank"
                        color="inherit"
                        underline="none"
                        className={classes.typography}
                      >
                        <Typography variant="h6" className={classes.typography}>
                          <YouTube className={classes.icon} />
                          You Tube
                        </Typography>
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <div className="text-center p-3">
            <Typography
              variant="h6"
              className={`${classes.typography}, ${classes.copyright}`}
              component="div"
            >
              <Box sx={{ fontWeight: "lighter", my: 1 }}>
                <Copyright className={classes.icon} />
                2022 Copyrights CryptoNaukri
              </Box>
            </Typography>
          </div>
        </footer>
      </>
    );
  }else{
    return(<>
    <TFooter />
    </>);
  }
  
};

export default Footer;
