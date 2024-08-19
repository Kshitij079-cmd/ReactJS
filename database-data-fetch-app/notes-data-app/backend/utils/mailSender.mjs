import nodemailer from "nodemailer";
const mailSender = async (email, title, body)=>{
    try {
// const port = 5005;
const port = 5001;

        //to send email ->  firstly create a Transporter
        let transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,//-> Host SMTP detail
            port:port,
                auth:{
                    user: process.env.MAIL_USER,  //-> User's mail for authentication
                    pass: process.env.MAIL_PASS,  //-> User's password for authentication
                }
        }) 

        //now Send e-mails to users
        let info = await transporter.sendMail({
            from: 'check.kshitijrajvanshi@gmail.com- Sandeep Singh',
            to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
        })

        console.log("Info is here: ",info)
        return info

    } catch (error) {
        console.log(error.message);
    }
}

export default  mailSender;