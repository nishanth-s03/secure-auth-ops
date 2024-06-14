import express from 'express';
import { insertMailTemplate,sendMail } from '../../controllers/mail.controller.js';
import { verifyToken } from '../../middlewares/auth.midlleware.js';

const router = express.Router();

//Inserting Email template
router.post('/insert-mail-template',verifyToken,insertMailTemplate);
//Sending Mail
router.post('/send-mail',verifyToken,sendMail);

export default router;