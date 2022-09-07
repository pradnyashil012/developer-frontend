import React from "react";
import Skeleton from '@mui/material/Skeleton';
import { Box, Typography, makeStyles } from '@material-ui/core';

const JobCardLoading = () =>{

    return (
        <div className="animate-pulse h-60 flex flex-col justify-between grow shrink basis-80 py-3 px-2 border border-gray-500 rounded-lg">
            <div>
                <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
                <div className="mt-2 w-1/4 h-4 bg-gray-300 rounded-md"></div>
                <div className="w-full h-3 mt-4 bg-gray-300 rounded-md"></div>
                <div className="w-full h-3 mt-2 bg-gray-300 rounded-md"></div>
                <div className="w-1/2 h-3 mt-2 bg-gray-300 rounded-md"></div>
                <div className="w-1/4 h-3 mt-2 bg-gray-300 rounded-md"></div>
            </div>
            <div className="mt-2 flex justify-between items-center">
                <div className="w-1/3">
                    <div className="w-1/3 h-3 bg-gray-300 rounded-md"></div>
                    <div className="w-1/3 h-3 bg-gray-300 rounded-md mt-1"></div>
                </div>
                {/* <div>
                    <button className="px-3 py-2 border rounded-md hover:bg-gray-800">Details</button>
                </div> */}
            </div>
        </div>
    );
}

export default JobCardLoading;




// ** old material ui

// const classes = useStyles();

// const useStyles = makeStyles((theme) => ({
//     jobCardContainer: {
//         [theme.breakpoints.between('xs', 770)]: {
//         display: 'flex',
//         justifyContent: 'center',
//         flexWrap: 'wrap'
//         }
//     },
//     jobCard: {
//         width: '100%',
//         height: '200px',
//         backgroundColor: 'white',
//         borderRadius: '5px',
//         overflow: 'hidden',
//         boxShadow: '3px 3px 10px silver',
//         transition: '100ms All linear',
//         display: 'flex',
//         margin: '20px 0',
//         [theme.breakpoints.between('xs', 770)]: {
//         flexDirection: 'column',
//         maxWidth: '350px',
//         height: 'auto',
//         },
//         '&:hover': {
//         border: '1px solid #3F51B5',
//         boxShadow: '3px 3px 15px gray',
//         padding: 0
//         },
//     },
//     left: {
//         width: '30%',
//         height: '100%',
//         padding: '15px',
//         backgroundColor: theme.palette.primary.main,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         [theme.breakpoints.between('xs', 770)]: {
//         width: '100%'
//         },
//     },
//     leftImg: {
//         maxHeight: '100%',
//         maxWidth: '100%',
//     },
//     right: {
//         width: '70%',
//         height: '100%',
//         backgroundColor: 'white',
//         padding: '15px',
//         fontWeight: 'light',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         [theme.breakpoints.between('xs', 770)]: {
//         width: '100%'
//         },
//     },
//     rightBottom: {
//         position: 'relative',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },
//     applyBtn: {
//         '&:hover': {
//         backgroundColor: theme.palette.primary.main,
//         color: 'white'
//         },

//     },
//     headcontain: {
//         position: 'relative',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'start',
//         [theme.breakpoints.between('xs', 770)]: {
//         flexDirection: 'column',

//         },
//     },
//     editbtn: {
//         position: 'relative',
//         display: 'flex',
//         justifyContent: 'space-between',
//         [theme.breakpoints.between('xs', 770)]: {
//         margin: '0'
//         },
//     },

//     btn: {
//         border: 'blue solid 1px',
//         '&:hover': {
//         border: 'blue solid 1px',
//         backgroundColor: 'white',
//         color: 'blue'
//         },
//     },
// }));

{/* <div>
<Box className={classes.jobCardContainer}>
    <Box className={classes.jobCard}>
    <Box className={classes.left}>
        <Skeleton variant="rectangular" width={210} height={118} />
    </Box>
    <Box className={classes.right}>
        <Box>
            <Skeleton variant="text" />
            <Skeleton variant="text" />

        </Box>
        <Box className={classes.rightBottom}>
        <Box>
            <Box>
            <Typography variant='p'>
                <Box sx={{
                fontWeight: 'regular',
                }}>
                Experience : <Skeleton variant="text" />
                </Box>
            </Typography>
            <Typography variant='p'>
                <Box sx={{
                fontWeight: 'regular',
                }}>
                Openings : <Skeleton variant="text" />
                </Box>
            </Typography>
            </Box>
        </Box>
        </Box>
    </Box>
    </Box>
</Box >
</div > */}