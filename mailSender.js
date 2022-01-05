import nodemailer from 'nodemailer'

async function sendMail(email, position, msg) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
        user: testAccount.user,
        pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '"Nodemailer"',
        to: email,
        subject: msg,
        html: 
        `       <h3>Position</h3>
                <ul>
                    <li>Company: ${position.company}</li>
                    <li>Level: ${position.level}</li>
                    <li>Category: ${position.category}</li>
                    <li>Japanese Required: ${position.japaneseRequired}</li>
                    <li>Description: ${position.description}</li>
                </ul>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default sendMail