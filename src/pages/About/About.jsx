
import { Link } from "react-router-dom";
import "./About.css";

const benefits = [
  {
    icon: "🏍️",
    title: "Paixão por motos",
    description:
      "Entendemos a importância de cada peça para o desempenho, a segurança e a durabilidade da sua motocicleta.",
  },
  {
    icon: "🛠️",
    title: "Peças e acessórios",
    description:
      "Uma seleção de produtos para manutenção, reposição e personalização da sua moto.",
  },
  {
    icon: "🤝",
    title: "Atendimento próximo",
    description:
      "Estamos prontos para ajudar você a encontrar os produtos adequados para sua necessidade.",
  },
  {
    icon: "✅",
    title: "Compra com confiança",
    description:
      "Informações claras sobre os produtos e suporte para ajudar você durante sua compra.",
  },
];

export default function About() {
  return (
    <main className="about">
      <section className="about__hero">
        <div className="about__hero-content">
          <span className="about__eyebrow">
            SOBRE A NOSSA LOJA
          </span>

          <h1 className="about__title">
            Feita para quem
            <span> vive a paixão por motos.</span>
          </h1>

          <p className="about__description">
            Mais do que vender peças, queremos ajudar você a
            manter sua motocicleta pronta para cada caminho.
            Qualidade, confiança e atendimento estão no centro
            da nossa maneira de trabalhar.
          </p>

          <Link to="/produtos" className="about__button">
            Conheça nossos produtos
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="about__hero-decoration" aria-hidden="true">
          <span className="about__hero-line" />
          <span className="about__hero-label">
            PERFORMANCE • CONFIANÇA • LIBERDADE
          </span>
        </div>
      </section>

      <section className="about__story">
        <div className="about__story-heading">
          <span className="about__eyebrow">
            NOSSA HISTÓRIA
          </span>

          <h2 className="about__section-title">
            Cada detalhe faz a diferença.
          </h2>
        </div>

        <div className="about__story-content">
          <p>
            Acreditamos que uma motocicleta representa muito
            mais do que um meio de transporte. Ela significa
            liberdade, independência, trabalho e novas
            experiências.
          </p>

          <p>
            Por isso, buscamos oferecer peças e acessórios que
            atendam às necessidades dos motociclistas, com
            informações claras e atenção na escolha dos produtos.
          </p>

          <p>
            Nosso compromisso é construir uma relação de
            confiança com cada cliente, oferecendo um atendimento
            atencioso e uma experiência de compra simples,
            prática e transparente.
          </p>
        </div>
      </section>

      <section className="about__benefits">
        <div className="about__benefits-heading">
          <span className="about__eyebrow">
            NOSSO COMPROMISSO
          </span>

          <h2 className="about__section-title">
            O que você encontra aqui
          </h2>

          <p className="about__section-description">
            Trabalhamos para tornar sua experiência de compra
            mais segura, prática e conveniente.
          </p>
        </div>

        <div className="about__grid">
          {benefits.map((benefit) => (
            <article
              className="about__card"
              key={benefit.title}
            >
              <div
                className="about__card-icon"
                aria-hidden="true"
              >
                {benefit.icon}
              </div>

              <h3 className="about__card-title">
                {benefit.title}
              </h3>

              <p className="about__card-description">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="about__cta">
        <div className="about__cta-content">
          <span className="about__eyebrow">
            PRECISA DE AJUDA?
          </span>

          <h2 className="about__cta-title">
            Vamos encontrar a peça certa para sua moto?
          </h2>

          <p className="about__cta-description">
            Entre em contato com nossa equipe e tire suas
            dúvidas sobre produtos e compatibilidade.
          </p>
        </div>

        <Link to="/contato" className="about__button about__button--light">
          Fale conosco
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
