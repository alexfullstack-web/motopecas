import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Toast from "../Toast/Toast";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import "./Layout.css";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="layout">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      {/* a "key" reinicia a animação de entrada a cada troca de página */}
      <div id="conteudo" className="layout__content page-transition" key={pathname}>
        <Outlet />
      </div>

      <Footer />
      <WhatsAppButton />
      <Toast />
    </div>
  );
}
