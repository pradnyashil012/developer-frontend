import React from "react";
import { Typography, Box, Container } from "@material-ui/core";
import Footer from "./Footer/Footer";
import { makeStyles } from "@material-ui/styles";

const Terms = () => {
  return (
    <div className="bg-gray-800 pt-16 h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-800 text-white p-4 max-w-7xl m-auto">
        <div className="mt-8 text-2xl font-bold tracking-wider underline underline-offset-4">
          Terms &amp; Conditions
        </div>
        <div className="mt-5 text-lg text-center px-20">
          <p>
            At CryptoNaukri, accessible from{" "}
            <a href="http://www.cryptonaukri.com/" className="text-cyan-600">
              http://www.cryptonaukri.com/
            </a>
            , one of our main priorities is the privacy of our visitors. This
            Privacy Policy document contains types of information that is
            collected and recorded by CryptoNaukri and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to Contact through email at{" "}
            <b className="tracking-wider text-cyan-600">support@cryptonaukri.com</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;

// ** old material ui

// const useStyles = makeStyles((theme) => ({
// mainbox: {
//     marginTop: "50px",
//     padding: "60px",
// },
// heading: {
//     color: "white",
//     backgroundColor: theme.palette.primary.main,
//     borderRadius: "5px",
//     padding: "10px",
//     boxShadow: "0 0 10px #6292E8",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
// },

// detail: {
//     paddingTop: "80px",

//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
// },
// }));

// const classes = useStyles();

{
  /* <Container>
<Box className={classes.mainbox}>
    <Box className={classes.heading}>
    <Typography variant="h4">Terms and Conditions</Typography>
    </Box>

    <Box className={classes.detail}>
    <Typography variant="h6">
        <p>
        At CryptoNaukri, accessible from{" "}
        <a href="http://www.cryptonaukri.com/">
            http://www.cryptonaukri.com/
        </a>
        , one of our main priorities is the privacy of our visitors.
        This Privacy Policy document contains types of information that
        is collected and recorded by CryptoNaukri and how we use it.
        </p>
        <p>
        If you have additional questions or require more information
        about our Privacy Policy, do not hesitate to Contact through
        email at <b>support@cryptonaukri.com</b>
        </p>
    </Typography>
    </Box>
</Box>
</Container> */
}
