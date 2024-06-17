import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, userName: string, message: string) => {
    // https://nodemailer.com/usage/using-gmail/
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `${subject}`,
            text: message,
            html: `<b>${message}</b>`
        };

        const mailRes = await transporter.sendMail(mailOptions);
        console.log('mailRes', mailRes);

        let mailResponse:string = '';
        if (mailRes.accepted.length > 0) {
            mailResponse = 'Email sent successfully';
        } else if (mailRes.rejected.length > 0) {
            mailResponse = 'Email not sent';
        } else {
            mailResponse = 'Email server error sent';
        }
        return mailResponse;
    } catch (error: any) {
        return JSON.stringify(error.message, null, 500);
    }
};

export interface EmailOptions {
    from: string;
    to: string;
    email: string;
    subject: string;
    text: string;
    html: string;
}

export interface MailResponse {
    accepted: string[];
    rejected: string[];
}

export const sendRegistrationEmailTemplate = async (userEmail: string, eventName: string, UserName: string): Promise<string> => {
    try {
        const subject: string = ` Confirmation, you have  ${eventName}`;
        const message: string = `Hello 👋🏻 ${UserName},  We hope you enjoy our services. Thank you for choosing us.`;

        const mailRes: string = await sendEmail(userEmail, subject, UserName, message);
        return mailRes;
    } catch (error: any) {
        return JSON.stringify(error.message, null, 500);
    }

}














































































































//import nodemailer, { Transporter } from 'nodemailer';

// Initialize the transporter once to reuse it
//const transporter: Transporter = nodemailer.createTransport({
    //service: 'gmail',
    //secure: true, // Use SSL for secure connection
    //auth: {
      //  user: process.env.EMAIL_USER, // Sender email address from environment variables
        //pass: process.env.EMAIL_PASSWORD // Email password from environment variables
    //}
//});

//// Function to send an email using NodeMailer
//export const sendEmail = async (email: string, subject: string, message: string): Promise<string> => {
  //  try {
        // Email options such as from, to, subject, text, and HTML content
    //    const mailOptions: nodemailer.SendMailOptions = {
      //      from: process.env.EMAIL_USER, // Sender email address
        //    to: email, // Recipient email address
          //  subject: subject, // Email subject
            //text: message, // Plain text email content
            //html: `<b>${message}</b>` // HTML email content
        //};

        // Sending the email and awaiting the result
        //const mailRes = await transporter.sendMail(mailOptions);
        //console.log('Mail response:', mailRes); // Logging the email response

        // Checking if the email was accepted or rejected
        //if (mailRes.accepted.length > 0) {
         //   return 'The email has been sent successfully.';
        //} else if (mailRes.rejected.length > 0) {
        //    return 'The email could not be sent.';
        //} else {
           // return 'An error occurred with the email server.';
        //}
    //} catch (error: any) {
      //  console.error('Error sending email:', error); // Log the error for debugging
        //return `Error: ${error.message}`;
   // }
//};

// Interface for email options (if needed in the future)
//export interface EmailOptions {
  //  from: string;
    //to: string;
    //email: string;
    //subject: string;
    //text: string;
    //html: string;
//}

// Function to send a registration email template
//export const sendRegistrationEmailTemplate = async (userEmail: string, eventName: string, userName: string): Promise<string> => {
  //  try {
    //    // Setting up the subject and message for the registration email
      //  const subject: string = `Confirmation: Registration for ${eventName}`;
        //const message: string = `Hello ${userName},\n\nWe are pleased to inform you that your registration for ${eventName} has been successfully processed. We hope you enjoy our services. Thank you for choosing us.\n\nBest regards,\nLabamba Restaurant Team\n\nThis is an automated email. Please do not reply.`;

        // Sending the email and awaiting the result
       // const mailRes: string = await sendEmail(userEmail, subject, message);
        //return mailRes; // Returning the email response message
    //} catch (error: any) {
      //  console.error('Error sending registration email:', error); // Log the error for debugging
        //return `Error: ${error.message}`;
   // }
//};
