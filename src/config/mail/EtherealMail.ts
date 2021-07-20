import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import HandleBarsMailTemplate from './HandleBarsMailTemplate';

interface ISendMail {
  to: IMailContact;
  from: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export interface ITemplateVariables {
  [key: string]: string | number;
}

interface IMailContact {
  name: string;
  email: string;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    } as SMTPTransport.Options);

    const message = await transporter.sendMail({
      from: {
        name: from.name || 'Equipe Api Vendas',
        address: from.email || 'equipe@apivendas.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject: subject,
      html: await mailTemplate.parse(templateData)
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
