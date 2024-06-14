import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
    templateName : {
        type: String,
        required: [true, 'This Field is Required'],
        unique: true,
    },
    subject: {
        type: String,
        required: [true, 'This Field is Required'],
    },
    emailBody: {
        type: String,
        required: [true, 'This Field is Required']
    },
},
{timestamps:true},
);

const MailTemplate = mongoose.model('mailtemplate',mailSchema);

export default MailTemplate;