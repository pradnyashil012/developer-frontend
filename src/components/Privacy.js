import React from "react";
// import { Typography, Box, Container } from "@material-ui/core";
// import Footer from "./Footer/Footer";
// import { makeStyles } from "@material-ui/styles";

const Privacy = () => {
  return (
    <div className="bg-gray-800 pt-16">
      <div className="flex flex-col items-center justify-center bg-gray-800 text-white p-4 max-w-7xl m-auto">
        <div className="mt-8 text-2xl font-bold tracking-wider underline underline-offset-4">
          Privacy Policy
        </div>
        <div className="mt-5 text-lg px-20">
          <h2 className="underline underline-offset-2">Privacy Policy for CryptoNaukri</h2>
          <p className="mt-1 text-base text-gray-500">
            At CryptoNaukri, accessible from{" "}
            <a href="http://www.cryptonaukri.com/">
              http://www.cryptonaukri.com/
            </a>
            , one of our main priorities is the privacy of our visitors. This
            Privacy Policy document contains types of information that is
            collected and recorded by CryptoNaukri and how we use it.
          </p>
          <p className="text-base text-gray-500">
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to Contact through email at{" "}
            <span className="text-cyan-600">support@cryptonaukri.com</span>
          </p>

          <h2 className="mt-2 underline underline-offset-2">Log Files</h2>
          <p className="mt-1 text-base text-gray-500">
            CryptoNaukri follows a standard procedure of using log files. These
            files log visitors when they visit websites. All hosting companies
            do this and a part of hosting services' analytics. The information
            collected by log files include internet protocol (IP) addresses,
            browser type, Internet Service Provider (ISP), date and time stamp,
            referring/exit pages, and possibly the number of clicks. These are
            not linked to any information that is personally identifiable. The
            purpose of the information is for analyzing trends, administering
            the site, tracking users' movement on the website, and gathering
            demographic information.
          </p>

          <h2 className="mt-2 underline underline-offset-2">Cookies and Web Beacons</h2>
          <p className="mt-1 text-base text-gray-500">
            Like any other website, CryptoNaukri uses 'cookies'. These cookies
            are used to store information including visitors' preferences, and
            the pages on the website that the visitor accessed or visited. The
            information is used to optimize the users' experience by customizing
            our web page content based on visitors' browser type and/or other
            information.
          </p>

          <h2 className="mt-2 underline underline-offset-2">Google DoubleClick DART Cookie</h2>
          <p className="mt-1 text-base text-gray-500">
            Google is one of a third-party vendor on our site. It also uses
            cookies, known as DART cookies, to serve ads to our site visitors
            based upon their visit to www.website.com and other sites on the
            internet. However, visitors may choose to decline the use of DART
            cookies by visiting the Google ad and content network Privacy Policy
            at the following URL –{" "}
            <a href="https://policies.google.com/technologies/ads" className="text-cyan-600">
              https://policies.google.com/technologies/ads
            </a>
          </p>

          <h2 className="mt-2 underline underline-offset-2">Privacy Policies</h2>
          <p className="mt-1 text-base text-gray-500">
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on CryptoNaukri,
            which are sent directly to users' browser. They automatically
            receive your IP address when this occurs. These technologies are
            used to measure the effectiveness of their advertising campaigns
            and/or to personalize the advertising content that you see on
            websites that you visit.
          </p>
          <p className="text-base text-gray-500">
            Note that CryptoNaukri has no access to or control over these
            cookies that are used by third-party advertisers.
          </p>

          <h2 className="mt-2 underline underline-offset-2">Third Party Privacy Policies</h2>
          <p className="mt-1 text-base text-gray-500">
            CryptoNaukri's Privacy Policy does not apply to other advertisers or
            websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options. You may find a complete list of
            these Privacy Policies and their links here: Privacy Policy Links.
          </p>
          <p className="text-base text-gray-500">
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites. What Are Cookies?
          </p>

          <h2 className="mt-2 underline underline-offset-2">Children's Information</h2>
          <p className="mt-1 text-base text-gray-500">
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </p>
          <p className="text-base text-gray-500">
            CryptoNaukri does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to Contact immediately and we will do our
            best efforts to promptly remove such information from our records.
          </p>

          <h2 className="mt-2 underline underline-offset-2">Online Privacy Policy Only</h2>
          <p className="mt-1 text-base text-gray-500">
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in CryptoNaukri. This policy is not
            applicable to any information collected offline or via channels
            other than this website.
          </p>

          <h2 className="mt-2 underline underline-offset-2">Consent</h2>
          <p className="mt-1 text-base text-gray-500">
            By using our website, you hereby consent to our Privacy Policy and
            agree to its Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

// ** old material ui

// const useStyles = makeStyles((theme) => ({
//     mainbox: {
//       marginTop: "50px",
//       padding: "40px",
//       // border:'2px solid Black'
//     },
//     heading: {
//       color: "white",
//       backgroundColor: theme.palette.primary.main,
//       borderRadius: "5px",
//       padding: "10px",
//       boxShadow: "0 0 10px #6292E8",
//       alignItems: "center",
//       justifyContent: "center",
//       textAlign: "center",
//     },
//     input: {
//       paddingTop: "40px",

//       alignItems: "center",
//       justifyContent: "center",
//       textAlign: "center",
//     },
//     detail: {
//       paddingTop: "10px",

//       alignItems: "center",
//       justifyContent: "center",
//       textAlign: "center",
//     },
//   }));

//   const classes = useStyles();

//   <>
//   <Container>
//     <Box className={classes.mainbox}>
//       <Box className={classes.heading}>
//         <Typography variant="h4">Privacy Policy</Typography>
//       </Box>
//       <Box className={classes.input}>
//         <Typography>
//   <h2>Privacy Policy for CryptoNaukri</h2>
//   <p>
//     At CryptoNaukri, accessible from{" "}
//     <a href="http://www.cryptonaukri.com/">
//       http://www.cryptonaukri.com/
//     </a>
//     , one of our main priorities is the privacy of our visitors.
//     This Privacy Policy document contains types of information that
//     is collected and recorded by CryptoNaukri and how we use it.
//   </p>
//   <p>
//     If you have additional questions or require more information
//     about our Privacy Policy, do not hesitate to Contact through
//     email at <b>support@cryptonaukri.com</b>
//   </p>

//   <h2>Log Files</h2>
//   <p>
//     CryptoNaukri follows a standard procedure of using log files.
//     These files log visitors when they visit websites. All hosting
//     companies do this and a part of hosting services' analytics. The
//     information collected by log files include internet protocol
//     (IP) addresses, browser type, Internet Service Provider (ISP),
//     date and time stamp, referring/exit pages, and possibly the
//     number of clicks. These are not linked to any information that
//     is personally identifiable. The purpose of the information is
//     for analyzing trends, administering the site, tracking users'
//     movement on the website, and gathering demographic information.
//   </p>

//   <h2>Cookies and Web Beacons</h2>
//   <p>
//     Like any other website, CryptoNaukri uses 'cookies'. These
//     cookies are used to store information including visitors'
//     preferences, and the pages on the website that the visitor
//     accessed or visited. The information is used to optimize the
//     users' experience by customizing our web page content based on
//     visitors' browser type and/or other information.
//   </p>

//   <h2>Google DoubleClick DART Cookie</h2>
//   <p>
//     Google is one of a third-party vendor on our site. It also uses
//     cookies, known as DART cookies, to serve ads to our site
//     visitors based upon their visit to www.website.com and other
//     sites on the internet. However, visitors may choose to decline
//     the use of DART cookies by visiting the Google ad and content
//     network Privacy Policy at the following URL –{" "}
//     <a href="https://policies.google.com/technologies/ads">
//       https://policies.google.com/technologies/ads
//     </a>
//   </p>

//   <h2>Privacy Policies</h2>
//   <p>
//     Third-party ad servers or ad networks uses technologies like
//     cookies, JavaScript, or Web Beacons that are used in their
//     respective advertisements and links that appear on CryptoNaukri,
//     which are sent directly to users' browser. They automatically
//     receive your IP address when this occurs. These technologies are
//     used to measure the effectiveness of their advertising campaigns
//     and/or to personalize the advertising content that you see on
//     websites that you visit.
//   </p>
//   <p>
//     Note that CryptoNaukri has no access to or control over these
//     cookies that are used by third-party advertisers.
//   </p>

//   <h2>Third Pary Privacy Policies</h2>
//   <p>
//     CryptoNaukri's Privacy Policy does not apply to other
//     advertisers or websites. Thus, we are advising you to consult
//     the respective Privacy Policies of these third-party ad servers
//     for more detailed information. It may include their practices
//     and instructions about how to opt-out of certain options. You
//     may find a complete list of these Privacy Policies and their
//     links here: Privacy Policy Links.
//   </p>
//   <p>
//     You can choose to disable cookies through your individual
//     browser options. To know more detailed information about cookie
//     management with specific web browsers, it can be found at the
//     browsers' respective websites. What Are Cookies?
//   </p>

//   <h2>Children's Information</h2>
//   <p>
//     Another part of our priority is adding protection for children
//     while using the internet. We encourage parents and guardians to
//     observe, participate in, and/or monitor and guide their online
//     activity.
//   </p>
//   <p>
//     CryptoNaukri does not knowingly collect any Personal
//     Identifiable Information from children under the age of 13. If
//     you think that your child provided this kind of information on
//     our website, we strongly encourage you to Contact immediately
//     and we will do our best efforts to promptly remove such
//     information from our records.
//   </p>

//   <h2>Online Privacy Policy Only</h2>
//   <p>
//     This Privacy Policy applies only to our online activities and is
//     valid for visitors to our website with regards to the
//     information that they shared and/or collect in CryptoNaukri.
//     This policy is not applicable to any information collected
//     offline or via channels other than this website.
//   </p>

//   <h2>Consent</h2>
//   <p>
//     By using our website, you hereby consent to our Privacy Policy
//     and agree to its Terms and Conditions.
//   </p>
//         </Typography>
//       </Box>
//       <Box className={classes.detail}>
//         <Typography variant="h6"></Typography>
//       </Box>
//     </Box>
//   </Container>
// </>
