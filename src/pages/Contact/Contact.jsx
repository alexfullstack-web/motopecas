import { useState } from "react";
import { buildWhatsAppUrl } from "../../services/whatsapp";
import "./Contact.css";

const FORM_ENDPOINT = "https://formspree.io/f/mnqvydqj";

export function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error("Falha no envio");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="contact">
      <div className="contact__container">
        <header className="contact__header">
          <h1 className="contact__title">Fale com a gente</h1>
          <p className="contact__paragraph">
            Tire dúvidas sobre produtos e compatibilidade ou peça um orçamento.
            Respondemos o mais rápido possível.
          </p>
        </header>

        <div className="contact__layout">
          <form className="contact__form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" autoComplete="name" required />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" autoComplete="email" required />

            <label htmlFor="message">Mensagem</label>
            <textarea id="message" name="message" rows="5" required />

            <button
              type="submit"
              className="contact__button"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando..." : "Enviar mensagem"}
            </button>

            <p className="contact__feedback" role="status" aria-live="polite">
              {status === "success" && "Mensagem enviada! Responderemos em breve."}
              {status === "error" &&
                "Não foi possível enviar agora. Tente novamente ou chame no WhatsApp."}
            </p>
          </form>

          <aside className="contact__aside">
            <h2 className="contact__aside-title">Prefere o WhatsApp?</h2>
            <p>Chame direto e receba atendimento na hora.</p>

            <a
              className="contact__whatsapp"
              href={buildWhatsAppUrl("Olá! Gostaria de atendimento.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir conversa
            </a>

            <dl className="contact__hours">
              <dt>Segunda a sexta</dt>
              <dd>8h às 18h</dd>
              <dt>Sábado</dt>
              <dd>8h às 13h</dd>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Contact;
