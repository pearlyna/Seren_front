import React from "react";
import "../estilos/Suporte.scss";

const Suporte = () => {
  return (
    <section className="suporte_box">
      <h2>Precisando de Ajuda?</h2>
      <p>Envie sua dúvida</p>
      <form className="suporte_form">
        <div className="nome_input">
          <label htmlFor="name">Nome:</label> <br />
          <input type="text" id="name" name="name" required />
        </div>
        <div className="email_input">
          <label htmlFor="email">Email:</label> <br />
          <input type="email" id="email" name="email" required />
        </div>
        <div className="mensagem_input">
          <label htmlFor="message">Mensagem:</label> <br />
          <textarea id="message" name="message" required />
        </div>
        <button className="enviar_botao" type="submit">
          Enviar
        </button>
      </form>
    </section>
  );
};
export default Suporte;
