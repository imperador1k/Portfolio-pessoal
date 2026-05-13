/**
 * Email Templates for Resend - VERSION 3 (Instagram DM Style - Safe Encoding)
 * Aesthetic: Dark Mode Instagram Messaging
 */

export const getNotificationTemplate = (name: string, email: string, subject: string, message: string) => {
  const initial = name.charAt(0).toUpperCase();

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Nova Mensagem Instagram Style</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 20px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; background-color: #121212; border-radius: 30px; border-collapse: separate; overflow: hidden; border: 1px solid #262626;">
              <!-- Header -->
              <tr>
                <td align="center" style="padding: 40px 20px 20px 20px;">
                  <div style="width: 90px; height: 90px; border-radius: 45px; overflow: hidden; margin-bottom: 15px; border: 2px solid #262626; padding: 3px;">
                     <div style="width: 84px; height: 84px; background-color: #3797f0; border-radius: 42px; text-align: center; line-height: 84px; color: #ffffff; font-weight: bold; font-size: 32px;">
                        ${initial}
                     </div>
                  </div>
                  <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">${name}</h1>
                  <p style="color: #a8a8a8; font-size: 14px; margin: 5px 0 20px 0;">${email} &middot; Instagram</p>
                  <a href="https://miguelweb.dev" style="background-color: #262626; color: #ffffff; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
                    Ver perfil
                  </a>
                </td>
              </tr>

              <!-- Chat Area -->
              <tr>
                <td style="padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="left" style="padding-bottom: 10px;">
                        <div style="display: inline-block; background-color: #262626; color: #ffffff; padding: 16px; border-radius: 22px; border-bottom-left-radius: 4px; max-width: 85%; font-size: 15px; line-height: 1.4;">
                          <div style="font-weight: 800; border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 8px; color: #3797f0;">
                            Subject: ${subject}
                          </div>
                          ${message}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="right" style="padding-top: 5px;">
                        <div style="display: inline-block; background-color: #3797f0; color: #ffffff; padding: 10px 16px; border-radius: 22px; border-bottom-right-radius: 4px; font-size: 14px; font-weight: 600;">
                          Novo contacto recebido &#10003;
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Gradient Button -->
              <tr>
                <td align="center" style="padding: 20px 20px 30px 20px;">
                  <a href="mailto:${email}" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #ffffff; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block;">
                    Responder agora
                  </a>
                </td>
              </tr>

              <!-- Input Placeholder -->
              <tr>
                <td style="padding: 0 20px 25px 20px;">
                  <div style="border: 1px solid #262626; border-radius: 25px; padding: 12px 20px; color: #a8a8a8; font-size: 14px;">
                    Mensagem...
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export const getAutoReplyTemplate = (name: string) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Obrigado pelo contacto</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 20px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; background-color: #121212; border-radius: 30px; border-collapse: separate; overflow: hidden; border: 1px solid #262626;">
              <!-- Header -->
              <tr>
                <td align="center" style="padding: 40px 20px 20px 20px;">
                  <div style="width: 90px; height: 90px; border-radius: 45px; overflow: hidden; margin-bottom: 15px; border: 2px solid #262626; padding: 3px;">
                     <img src="https://miguelweb.dev/insta.png" alt="Miguel Santos" width="84" height="84" style="border-radius: 42px; display: block; border: 0;" />
                  </div>
                  <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">Miguel Santos <span style="color: #3797f0;">&#10003;</span></h1>
                  <p style="color: #a8a8a8; font-size: 14px; margin: 5px 0 20px 0;">@miguel_sant0s &middot; Instagram</p>
                  <a href="https://miguelweb.dev" style="background-color: #262626; color: #ffffff; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
                    Ver perfil
                  </a>
                </td>
              </tr>

              <!-- Chat Bubbles -->
              <tr>
                <td style="padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="left" style="padding-bottom: 8px;">
                        <div style="display: inline-block; background-color: #3797f0; color: #ffffff; padding: 12px 18px; border-radius: 22px; border-bottom-left-radius: 4px; max-width: 85%; font-size: 15px; line-height: 1.5;">
                          Ol&aacute; <strong>${name}</strong>! &#128075;
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left">
                        <div style="display: inline-block; background-color: #3797f0; color: #ffffff; padding: 12px 18px; border-radius: 22px; border-bottom-left-radius: 4px; max-width: 85%; font-size: 15px; line-height: 1.5;">
                          Recebi a tua mensagem no meu portfolio. J&aacute; est&aacute; guardada nos meus pedidos! Vou responder-te o mais breve poss&iacute;vel. &#128640;
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer Links -->
              <tr>
                <td align="center" style="padding: 25px 20px; border-top: 1px solid #262626;">
                  <a href="https://linkedin.com/in/miguel-sant0s" style="color: #3797f0; text-decoration: none; font-weight: 700; font-size: 14px; margin: 0 10px;">LinkedIn</a>
                  <a href="https://github.com/imperador1k" style="color: #3797f0; text-decoration: none; font-weight: 700; font-size: 14px; margin: 0 10px;">GitHub</a>
                  <a href="https://miguelweb.dev" style="color: #3797f0; text-decoration: none; font-weight: 700; font-size: 14px; margin: 0 10px;">Portfolio</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
