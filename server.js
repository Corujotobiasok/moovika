const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'corujotobiass@gmail.com',  // Cambia esto por tu correo
        pass: 'buuf fyml pyof kqjq'  // Cambia esto por tu contraseña de aplicación de Gmail
    }
});

const verificationCodes = {};  // Para almacenar los códigos de verificación

app.post('/send-verification-email', (req, res) => {
    const { email } = req.body;

    // Genera un código de 4 dígitos
    const code = Math.floor(1000 + Math.random() * 9000);  
    verificationCodes[email] = code;

    const mailOptions = {
        from: 'corujotobiass@gmail.com',
        to: email,
        subject: 'Código de Verificación - Moovika',
        text: `Tu código de verificación es: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error al enviar el correo.');
        }
        res.status(200).send('Correo de verificación enviado.');
    });
});

app.post('/verify-email', (req, res) => {
    const { email, code } = req.body;

    if (verificationCodes[email] && verificationCodes[email] == code) {
        delete verificationCodes[email];  // Elimina el código una vez verificado
        res.status(200).send('Correo verificado correctamente.');
    } else {
        res.status(400).send('Código de verificación inválido.');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
