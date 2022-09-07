import { Typography, Box, Container } from "@material-ui/core";
import React from "react";
import Footer from "./Footer/Footer";
import { makeStyles } from "@material-ui/styles";
import { textAlign, width } from "@mui/system";
import { CenterFocusStrong } from "@material-ui/icons";

const AboutUS = () => {
  return (
    <div className="bg-gray-800 pt-16 h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-800 text-white p-4 max-w-7xl m-auto">
        <div className="mt-8 text-2xl font-bold tracking-wider underline underline-offset-4">
          About Us
        </div>
        <div className="mt-5 text-lg text-center px-20">
          <p>
            We are an ecosystem for Blockchain Developers where they can learn
            Blockchain development, can solve their problems using our community
            and can get the jobs using our job portal in Blockchain space
            startups and MNCs.
          </p>
          <p>
            If you have any query regrading Site, Advertisement and any other
            issue, please feel free to contact at{" "}
            <b className="tracking-wider text-cyan-600">support@cryptonaukri.com</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;

// ** old material ui

// const useStyles = makeStyles((theme) => ({
//     mainbox: {
//         marginTop: '50px',
//         padding: '40px',
//         // border:'2px solid Black'

//     },
//     heading: {
//         color: 'white',
//         backgroundColor: theme.palette.primary.main,
//         borderRadius: '5px',
//         padding: '10px',
//         boxShadow: '0 0 10px #6292E8',
//         alignItems: 'center',
//         justifyContent: 'center',
//         textAlign: 'center'

//     },
//     input: {
//         paddingTop: '150px',

//         alignItems: 'center',
//         justifyContent: 'center',
//         textAlign: 'center'
//     },
//     detail: {
//         paddingTop: '350px',

//         alignItems: 'center',
//         justifyContent: 'center',
//         textAlign: 'center'
//     },
// }))

// const classes = useStyles();

// <>
//     <Container>
//         <Box className={classes.mainbox}>
//             <Box className={classes.heading}>
//                 <Typography variant='h4'>
//                     About Us
//                 </Typography>
//             </Box>
//             <Box className={classes.input}>
//                 <Typography variant='h6'><p>We are an ecosystem for Blockchain Developers where they can learn Blockchain development, can solve their problems using our community and can get the jobs using our job portal in Blockchain space startups and MNCs.</p>
//                     <p>If you have any query regrading Site, Advertisement and any other issue, please feel free to contact at <strong>support@cryptonaukri.com</strong></p>
//                 </Typography>

//             </Box >
//             <Box className={classes.detail}>

//                 <Typography variant='h6'>

//                 </Typography>
//             </Box>
//         </Box>
//     </Container>

// </>
