import { Link } from "react-router-dom";
import SmartImage from "../../components/SmartImage/SmartImage";
import Icon from "../../components/Icon/Icon";
import { categories } from "../../data/categories";
import { useReveal } from "../../hooks/useReveal";
import "../Products/Products.css";
import "./About.css";

const values = [
  {
    icon: "heart",
    title: "Paixão por motos",
    description:
      "Entendemos a importância de cada peça para o desempenho, a segurança e a durabilidade da sua motocicleta.",
  },
  {
    icon: "wrench",
    title: "Peças e acessórios",
    description: "Uma seleção de produtos para manutenção, reposição e personalização da sua moto.",
  },
  {
    icon: "chat",
    title: "Atendimento próximo",
    description: "Estamos prontos para ajudar você a encontrar os produtos adequados para sua necessidade.",
  },
  {
    icon: "shield",
    title: "Compra com confiança",
    description: "Informações claras sobre os produtos e suporte para ajudar você durante sua compra.",
  },
];

const pick = (id) => categories.find((c) => c.id === id) || categories[0];

export default function About() {
  useReveal();
  const collage = [pick("transmissao"), pick("pneus"), pick("eletrica")];

  return (
    <main className="about">
      <section className="page-hero carbon">
        <div className="page-hero__stripes" aria-hidden="true" />
        <div className="container page-hero__inner">
          <span className="eyebrow eyebrow--light anim-fade-up">Sobre a nossa loja</span>
          <h1 className="page-hero__title">
            <span className="page-hero__line">Feita para quem</span>
            <span className="page-hero__line page-hero__line--accent">vive a paixão por motos.</span>
          </h1>
          <p className="page-hero__text anim-fade-up" style={{ animationDelay: "350ms" }}>
            Mais do que vender peças, queremos ajudar você a manter sua
            motocicleta pronta para cada caminho.
          </p>
        </div>
      </section>

      {/* História + colagem de imagens */}
      <section className="section">
        <div className="container about__story">
          <div className="about__collage">
            {collage.map((item, i) => (
              <div
                key={item.id}
                className={`about__photo about__photo--${i + 1} ${i === 0 ? "reveal-left" : "reveal-zoom"}`}
                data-delay={i * 150}
              >
                <SmartImage src={item.image} fallback={item.fallback} alt={item.name} />
              </div>
            ))}
            <span className="about__stamp reveal-zoom" data-delay="450" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="circle-text" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text>
                  <textPath href="#circle-text">PERFORMANCE • CONFIANÇA • LIBERDADE •</textPath>
                </text>
              </svg>
              <Icon name="gauge" size={28} />
            </span>
          </div>

          <div className="about__text reveal-right">
            <span className="eyebrow">Nossa história</span>
            <h2>
              Cada detalhe <span className="text-accent">faz a diferença.</span>
            </h2>
            <p>
              Acreditamos que uma motocicleta representa muito mais do que um
              meio de transporte. Ela significa liberdade, independência,
              trabalho e novas experiências.
            </p>
            <p>
              Por isso, buscamos oferecer peças e acessórios que atendam às
              necessidades dos motociclistas, com informações claras e atenção
              na escolha dos produtos.
            </p>
            <p>
              Nosso compromisso é construir uma relação de confiança com cada
              cliente, oferecendo um atendimento atencioso e uma experiência de
              compra simples, prática e transparente.
            </p>
            <Link to="/produtos" className="btn btn--primary btn--lg">
              Conheça nossos produtos
              <Icon name="arrow" size={18} className="icon--arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section about__values carbon">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow eyebrow--light">Nosso compromisso</span>
              <h2 className="about__values-title">
                O que você <span className="text-accent">encontra aqui</span>
              </h2>
              <p className="about__values-text">
                Trabalhamos para tornar sua experiência de compra mais segura,
                prática e conveniente.
              </p>
            </div>
          </div>

          <div className="about__grid">
            {values.map((item, i) => (
              <article className="about__card reveal" data-delay={i * 120} key={item.title}>
                <span className="about__card-number" aria-hidden="true">0{i + 1}</span>
                <span className="about__card-icon" aria-hidden="true">
                  <Icon name={item.icon} size={26} />
                </span>
                <h3 className="about__card-title">{item.title}</h3>
                <p className="about__card-description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="about__cta reveal-zoom">
            <div>
              <span className="eyebrow">Precisa de ajuda?</span>
              <h2 className="about__cta-title">Vamos encontrar a peça certa para sua moto?</h2>
              <p>Entre em contato com nossa equipe e tire suas dúvidas sobre produtos e compatibilidade.</p>
            </div>
            <Link to="/contato" className="btn btn--primary btn--lg">
              Fale conosco
              <Icon name="arrow" size={18} className="icon--arrow" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
