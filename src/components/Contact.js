import React from "react";
import { Typography, Box, Container } from "@material-ui/core";
import Footer from "./Footer/Footer";
import { makeStyles } from "@material-ui/styles";
import {BsLinkedin} from 'react-icons/bs'
import {AiFillTwitterCircle, AiFillInstagram} from 'react-icons/ai'
import {IoMdMail} from 'react-icons/io'

const Contact = () => {
  return (
    <div className="bg-gray-800 pt-16 h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-800 text-white p-4 max-w-7xl m-auto">
        <div className="mt-8 text-2xl font-bold tracking-wider underline underline-offset-4">
          Contact Us
        </div>
        <div className="mt-5 text-lg text-center px-20">
          <p>
            If you have any query regrading Site, Advertisement and any other
            issue, please feel free to contact at{" "}
            <b className="tracking-wider text-cyan-600">support@cryptonaukri.com</b>
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-xl mt-5">- Our Social Links -</div>
          <div className="mt-3 flex flex-wrap gap-4 items-end">
            <a href="https://www.linkedin.com/company/cryptonaukri/" target='_blank' className="m-0 p-0">
              <div className="grow shrink-0 flex flex-col justify-center items-center"><BsLinkedin size={23} /> <span>Linkedin</span></div>
            </a>
            <a href="https://twitter.com/CryptoNaukri" target="_blank" className="m-0 p-0">
              <div className="grow shrink-0 flex flex-col justify-center items-center"><AiFillTwitterCircle size={28} /> <span>Twitter</span></div>
            </a>
            <a href="https://www.instagram.com/cryptonaukri/" target="_blank" className="m-0 p-0">
              <div className="grow shrink-0 flex flex-col justify-center items-center"><AiFillInstagram size={28} /> <span>Instagram</span></div>
            </a>
            <a href="mailto:cryptonaukri@gmail.com" target='_blank' className="m-0 p-0">
              <div className="grow shrink-0 flex flex-col justify-center items-center"><IoMdMail size={25} /> <span>Mail</span></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// ** old material ui

// const useStyles = makeStyles((theme) => ({
//     mainbox: {
//         marginTop: '50px',
//         padding: '60px',

// const classes = useStyles();

//     },
//     heading: {
//         color: 'white',
//         backgroundColor: theme.palette.primary.main,
//         borderRadius: '5px',
//         padding: '10px',
//         boxShadow: '0 0 10px #6292E8',
//         alignItems:'center',
//         justifyContent:'center',
//         textAlign:'center'

//     },

//     detail: {
//         paddingTop:'150px',

//         alignItems:'center',
//         justifyContent:'center',
//         textAlign:'center'
//     },
// }))

{
  /* <>
    <Container>
        <Box className={classes.mainbox}>
            <Box className={classes.heading}>
                <Typography variant='h4'>
                    Contact 
                </Typography>
            </Box>
            
            <Box className={classes.detail}>

            <Typography variant='h5'>
            <p>If you have any query regrading Site, Advertisement and any other issue, please feel free to contact at 
                    <strong> support@cryptonaukri.com</strong></p>
            </Typography>
            </Box>
        </Box>
    </Container>
</> */
}
