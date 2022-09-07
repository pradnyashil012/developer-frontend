import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
  bg: {
    height: 'auto',
    minHeight: '95vh',
    marginTop:'50px',
    backgroundImage: "url('img/landing.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  text: {
    color: 'white',
    // fontSize:'10.5rem'
  },
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 'inherit'
  },
  secName: {
    color: 'white',
    lineHeight: '4rem',
    fontSize: 55,
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      lineHeight: '3.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 27,
      lineHeight: '2.9rem',
    },
  },
  primeName: {
    color: 'white',
    lineHeight: '5rem',
    fontSize: 150,
    [theme.breakpoints.down('sm')]: {
      fontSize: 105,
      lineHeight: '3.7rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 65,
      lineHeight: '2rem',
    },
  },
  TagName: {
    color: 'white',
    lineHeight: '7rem',
    fontSize: 45,
    [theme.breakpoints.down('sm')]: {
      fontSize: 45,
      lineHeight: '3.9rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 27,
      lineHeight: '3rem',
    },
  },
  span: {
    fontWeight: '500',
    fontFamily: 'Kanit, sans-serif !important',
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <Container className={classes.container}>
        <Typography variant='h3' className={classes.text , classes.secName}>
          <Box sx={{ fontWeight: '500', fontFamily: 'Kanit, sans-serif !important' }}>
            Towards the
          </Box>
        </Typography>
        <Typography variant='h1' className={classes.text , classes.primeName}>
          <Box sx={{ fontWeight: '500', fontFamily: 'Kanit, sans-serif !important' }}>
            Revolution
          </Box>
        </Typography>
        <Typography variant='h6' className={classes.text , classes.TagName}>
          <Box sx={{ fontWeight: 'lighter', my: 1 }}>
            CryptoNaukri
          </Box>
        </Typography>
      </Container>
    </div>
  )
}

export default Landing;