const nodemailer = require("nodemailer");

enviarMail = async ()=> {
    const config = {
        host : 'smtp.gmail.com',
        port : 587,
        auth : {
            user : 'corujotobiass@gmail.com',
            pass : 'buuf fyml pyof kqjq'
        }
    }

    const mensaje = {
        from : 'corujotobiass@gmail.com',
        to : 'corujotobiasok@gmail.com',
        subject : 'correo de prueba brrr',
        text : 'envio este correo eletronico perrito'
    }

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(mensaje);

    console.log(info)
}


enviarMail();
