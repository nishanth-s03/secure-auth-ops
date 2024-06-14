import MailTemplate from "../models/mail.model.js";
import User from "../models/user.model.js";
import transporter from "../config/emailTransport.config.js";

//Inserting Template
const insertMailTemplate = async(req,res) => {
    try {
        const { templateName,emailSubject,emailBody } = req.body;

        //Creating A New Template
        const emailTemplate = new MailTemplate({
            templateName,
            subject:emailSubject,
            emailBody,
        });

        //Saving New Template
        await emailTemplate.save();

        //Sending Response To Client
        return res.status(201).json({message:'Templated Created Successfully', templateData:emailTemplate});

    } catch (error) {
        return res.status(500).json({message:'Internal Server Error',errorMessage:error.message});
    }
};

//Sending Mail
const sendMail = async (req, res) => {
    try {
        // Fetch the current user
        const currentUser = await User.findOne({ _id: req.user.id });
        const senderMailId = currentUser.email;

        // Fetch the target users based on an array of user IDs
        const targetUsers = await User.find({ _id: { $in: req.body.userIds } });

        // Fetch the email template
        const template = await MailTemplate.findOne({ _id: req.body.templateId });
        const emailSubject = template.subject;
        const emailBody = template.emailBody;

        // Iterate over the targetUsers array to send emails to each user
        let sendMailPromises = targetUsers.map(async (targetUser) => {
            const recieverMailId = targetUser.email;

            // Set up email data with Unicode symbols
            let message = {
                from: `${currentUser.name} <${senderMailId}>`,
                to: recieverMailId,
                subject: emailSubject,
                html: `<p>Hello ${targetUser.name},<br>${emailBody}<br><p>Best Regards</p></p>`,
            };

            // Send mail with defined transport object
            return transporter.sendMail(message);
        });

        // Wait for all emails to be sent
        const infoArray = await Promise.all(sendMailPromises);

        return res.status(200).json({ message: 'Emails Sent Successfully', information: infoArray });
    } catch (error) {
        return res.status(500).json({ message: `Error Occurred: ${error.message}` });
    }
}

export { insertMailTemplate,sendMail };