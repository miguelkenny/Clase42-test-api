//Nodemailer
import { createTransport } from 'nodemailer'

const adminEmail = 'miguelcastrokenny@gmail.com'

const sendInfoEmail = async (body, option) => {

    const transport = createTransport({
        service: 'gmail',
        port: '587',
        auth: {
            user: 'miguelcastrokenny@gmail.com',
            pass: 'cslhvbpzxonzuegb'
        }
    })

    function sendInfoRegisterOrSale(key) {
        switch (key) {
            case 1:
                return `Datos de Nuevo Usuario Registrado:
                ${JSON.stringify(body)}`

            case 2:
                return `Datos de Nueva Venta:
                    ${JSON.stringify(body)}`
            default:
                break;
        }
    }

    const mailOptions = {
        from: 'Women Shop',
        to: `${adminEmail}`,
        subject: option === 1 ? 'Nuevo Registro' : 'Nueva Venta Generada',
        html: sendInfoRegisterOrSale(option)
    }
    try {
        await transport.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }
}

export default sendInfoEmail