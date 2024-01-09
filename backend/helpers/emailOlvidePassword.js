import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
    subject: "Restablezca su contraseña",
    text: 'Restablezca su contraseña',
    html: `<p>Hola: ${nombre}, haz solicitado restablecer su contraseña.</p>
    <P>Sigue el siguiente enlace para generar su nueva contraseña:
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Comprobar Cuenta</a></P>

    <p>Si tu no creaste esta cuenta, ignora este mensaje</p>
    `,
  });

  console.log("Mensaje enviado: %S", info.messageId);
};

export default emailOlvidePassword;
