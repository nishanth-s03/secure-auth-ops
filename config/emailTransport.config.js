import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

//Creating Email Transport
let transporter = nodemailer.createTransport({
    host:'smtp.office365.com',
    port: 587,
    secure: false,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default transporter;