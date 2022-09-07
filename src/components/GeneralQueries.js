import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accordion: {
      margin: theme.spacing(50),
      width: theme.spacing(120),
      marginTop: '200px',
      padding: '60px',
      alignItems:'center',
      justifyContent:'center',
      textAlign:'center'
    },
  })
);

function GeneralQueries() {
  const classes = useStyles();
  return (
    <Box className={classes.accordion}>
      <Accordion>
        <AccordionSummary>
          <Typography>This is  Question 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            sapien et ligula ullamcorper malesuada proin libero nunc consequat.
            Mauris sit amet massa vitae. Varius duis at consectetur lorem donec
            massa sapien faucibus. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography>This is  Question 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            sapien et ligula ullamcorper malesuada proin libero nunc consequat.
            Mauris sit amet massa vitae. Varius duis at consectetur lorem donec
            massa sapien faucibus. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography>This is  Question 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar
            sapien et ligula ullamcorper malesuada proin libero nunc consequat.
            Mauris sit amet massa vitae. Varius duis at consectetur lorem donec
            massa sapien faucibus. 
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    
  );
}

export default GeneralQueries;