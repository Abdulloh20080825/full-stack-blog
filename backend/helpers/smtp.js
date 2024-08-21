const nodemailer = require('nodemailer');

const SMTP_PASS = 'zdoj sglv rfiw xkuc';
const SMTP_USER = 'abdullohkurbonov2008@gmail.com';
const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 587;

class SmtpService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			secure: false,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASS,
			},
		});
	}

	async sendMail(email) {
		await this.transporter.sendMail({
			from: SMTP_USER,
			to: email,
			subject: 'Message sent',
			html: `
                <div>
                        <h1>Email sent successfully. Your message has been sent to the user, please wait for a response</h1>
                </div>
        `,
		});
	}
}

module.exports = new SmtpService();
