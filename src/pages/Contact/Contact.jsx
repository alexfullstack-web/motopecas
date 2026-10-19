import { useState } from "react";
import Icon, { WhatsAppIcon } from "../../components/Icon/Icon";
import { buildWhatsAppUrl } from "../../services/whatsapp";
import "../Products/Products.css";
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
      <section className="page-hero carbon">
        <div className="page-hero__stripes" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow eyebrow--light anim-fade-up">Contato</span>
          <h1 className="page-hero__title">
            <span className="page-hero__line">Fale com</span>
            <span className="page-hero__line page-hero__line--accent">a gente.</span>
          </h1>
          <p className="page-hero__text anim-fade-up" style={{ animationDelay: "350ms" }}>
            Tire dúvidas sobre produtos e compatibilidade ou peça um orçamento.
            Respondemos o mais rápido possível.
          </p>
        </div>
      </section>

      <div className="container contact__layout">
        <form className="contact__form" onSubmit={handleSubmit}>
          <h2 className="contact__form-title">Envie uma mensagem</h2>

          <div className="field">
            <input type="text" id="name" name="name" autoComplete="name" placeholder=" " required />
            <label htmlFor="name">Nome</label>
          </div>

          <div className="field">
            <input type="email" id="email" name="email" autoComplete="email" placeholder=" " required />
            <label htmlFor="email">E-mail</label>
          </div>

          <div className="field">
            <input type="text" id="moto" name="moto" placeholder=" " />
            <label htmlFor="moto">Modelo e ano da moto (opcional)</label>
          </div>

          <div className="field">
            <textarea id="message" name="message" rows="5" placeholder=" " required />
            <label htmlFor="message">Mensagem</label>
          </div>

          <button
            type="submit"
            className={`btn btn--primary btn--lg contact__button ${status === "sending" ? "is-sending" : ""}`}
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <span className="spinner" aria-hidden="true" /> Enviando...
              </>
            ) : (
              <>
                Enviar mensagem <Icon name="arrow" size={18} className="icon--arrow" />
              </>
            )}
          </button>

          <p className={`contact__feedback contact__feedback--${status}`} role="status" aria-live="polite">
            {status === "success" && (
              <>
                <Icon name="check" size={18} /> Mensagem enviada! Responderemos em breve.
              </>
            )}
            {status === "error" && "Não foi possível enviar agora. Tente novamente ou chame no WhatsApp."}
          </p>
        </form>

        <aside className="contact__aside">
          <div className="contact__card contact__card--whatsapp">
            <span className="contact__card-icon">
              <WhatsAppIcon size={28} />
            </span>
            <h2 className="contact__aside-title">Prefere o WhatsApp?</h2>
            <p>Chame direto e receba atendimento na hora.</p>
            <a
              className="btn btn--whatsapp btn--lg"
              href={buildWhatsAppUrl("Olá! Gostaria de atendimento.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir conversa
              <Icon name="arrow" size={18} className="icon--arrow" />
            </a>
          </div>

          <div className="contact__card">
            <span className="contact__card-icon contact__card-icon--red">
              <Icon name="clock" size={26} />
            </span>
            <h2 className="contact__aside-title">Horário de atendimento</h2>
            <dl className="contact__hours">
              <div>
                <dt>Segunda a sexta</dt>
                <dd>8h às 18h</dd>
              </div>
              <div>
                <dt>Sábado</dt>
                <dd>8h às 13h</dd>
              </div>
              <div>
                <dt>Domingo</dt>
                <dd>Fechado</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Contact;
