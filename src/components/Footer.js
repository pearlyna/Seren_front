import React from "react";
import "../estilos/Footer.scss";

const Footer = () => {
  return (
    <section className="footer_box">
      <div className="info_box">
        <h3>Informações de Contato</h3>
        <ul>
          <li>Telefone: +55 (11) 1234-5678</li>
          <li>E-mail: serenvilar.br@gmail.com</li>
          <li>WhatsApp: +55 (11) 97230-3922</li>
        </ul>
      </div>

      <div className="redes_box">
        <h3>Redes Sociais</h3>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>X</li>
        </ul>
      </div>

      <div className="horario_box">
        <h3>Horário de Atendimento</h3>
        <ul>
          <li>Atendimento: Todos os dias, 24 horas</li>
          <li>Atendimento pelo WhatsApp: 24 horas</li>
        </ul>
      </div>

      <div className="copyright">
        <p>&copy; 2024 SERENVILAR. Todos os direitos reservados.</p>
      </div>
    </section>
  );
};

export default Footer;
