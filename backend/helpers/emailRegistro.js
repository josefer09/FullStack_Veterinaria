import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

  const {email, nombre, token} = datos;

  // Enviar el email

  const info = await transport.sendMail({
    from: '"APV - Administrador de Pacientes de Veterinaria" <apv@correo.com>',
    to: email,
    subject: "Comprueba tu cuenta en APV",
    text: 'Comprueba tu cuenta en APV',
    html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
    <P>Tu cuenta ya casi esta lista, solo debes comprobarla en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></P>

    <p>Si tu no creaste esta cuenta, ignora este mensaje</p>
    `,
  });

  console.log("Mensaje enviado: %S", info.messageId);
};

export default emailRegistro;
