import React from "react";
import pic1 from "../assets/imgs/houseFront.jpg";
import pic2 from "../assets/imgs/house_front_ish.jpg";
import "../estilos/Sobre.scss";

const Sobre = () => {
  return (
    <section className="sobre_container">
      <section className="right_caixa">
        <div className="titulo">
          <h2>SOBRE</h2>
        </div>
        <p className="p">
          <span className="span1">
            Bem-vindo ao Serenvilar, seu refúgio perfeito para relaxar. <br />
            A propriedade oferece acomodações confortáveis com uma
            <br />
            combinação de estilo moderno, cercada por jardins tranquilos e{" "}
            <br />
            vistas deslumbrantes.
          </span>
          <span className="span2">
            Aqui, você pode desfrutar de atividades ao ar livre, como <br />
            caminhadas, além de momentos de descanso nos espaços <br />
            comuns aconchegantes.
          </span>
        </p>
        <img className="pic1" src={pic1} alt="pic1" />
      </section>

      <section className="left_caixa">
        <img className="pic2" src={pic2} alt="pic2" />
        <p className="p">
          <span className="span3">
            A minha missão é tornar cada estadia única e especial. 
            <br />
            Acredito que pequenos detalhes fazem uma grande diferença, e 
            <br />
            me esforço para oferecer o melhor em conforto e hospitalidade.
          </span>
          <span className="span4">
            Localizado em uma região rica em belezas naturais, o Serenvilar é{" "}
            <br />
            o destino ideal para quem busca uma pausa na rotina. Com <br />
            hospitalidade acolhedora e experiências únicas, garantimos uma{" "}
            <br />
            estadia relaxante e memorável.
          </span>
        </p>
        <button className="ver_botao">Ver Local</button>
      </section>
    </section>
  );
};
export default Sobre;
