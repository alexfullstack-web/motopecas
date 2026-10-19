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
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <div id="conteudo" className="layout__content">
        <Outlet />
      </div>

      <Footer />
      <WhatsAppButton />
      <Toast />
    </div>
  );
}
