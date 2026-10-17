import nodemailer from 'nodemailer'
import { config } from '../config.js'

/*
  Wysyłka e-maila z linkiem logowania przez SMTP.

  Bez skonfigurowanego SMTP (zmienna SMTP_HOST pusta) link jest tylko wypisywany w konsoli
  serwera. Dzięki temu można się logować lokalnie bez skrzynki pocztowej, a na serwerze
  odczytać link poleceniem `docker compose logs api`, zanim zostanie podpięta poczta.
*/
const transporter = config.smtp.host
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      // Port 465 to połączenie szyfrowane od początku; 587 zaczyna jawnie i przechodzi na TLS (STARTTLS).
      secure: config.smtp.port === 465,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    })
  : null

export async function sendLoginLink(email, link) {
  if (!transporter) {
    console.log(`\n[mail] Link logowania dla ${email}:\n${link}\n`)
    return
  }

  await transporter.sendMail({
    from: config.smtp.from,
    to: email,
    subject: 'Twój link do logowania w PetTrace',
    text: `Cześć!\n\nKliknij, aby zalogować się do PetTrace:\n${link}\n\nLink jest ważny 15 minut i działa tylko raz.\nJeśli to nie Ty prosiłeś o logowanie, zignoruj tę wiadomość.`,
    html: `<p>Cześć!</p><p><a href="${link}">Kliknij tutaj, aby zalogować się do PetTrace</a>.</p><p>Link jest ważny 15 minut i działa tylko raz. Jeśli to nie Ty prosiłeś o logowanie, zignoruj tę wiadomość.</p>`,
  })
}
