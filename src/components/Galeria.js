import React, { useState, useEffect } from "react";
import img1 from "../assets/imgs/living_area.jpg";
import img2 from "../assets/imgs/bathroom_1.jpg";
import img3 from "../assets/imgs/garden_view.jpg";
import img4 from "../assets/imgs/chandelier_room.jpg";
import img5 from "../assets/imgs/grefancy_room.jpg";
import img6 from "../assets/imgs/yard_house.jpg";
import img7 from "../assets/imgs/black_bathroom.jpg";
import img8 from "../assets/imgs/house_at_night.jpg";
import img9 from "../assets/imgs/house_sideview.jpg";
import img10 from "../assets/imgs/house_side_fullview.jpg";
import "../estilos/Galeria.scss";

const Galeria = () => {
  const imagens = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  const [indiceInicial, setIndiceInicial] = useState(0);
  const [quantidadeImagens, setQuantidadeImagens] = useState(4); // começa com 4 imagens 

  useEffect(() => {
    const ajustarQuantidadeImagens = () => {
      const larguraTela = window.innerWidth;
      const larguraImagem = 250; // largura media de uma imagem 
      const espacamento = 16; // espaco entre as imagens
      const imagensPorLinha = Math.floor(larguraTela / (larguraImagem + espacamento));
      setQuantidadeImagens(imagensPorLinha); // define quantas imagens cabem certinho na tela
    };

    // chama a funcao na primeira renderizacao e quando a tela redimensiona
    ajustarQuantidadeImagens();
    window.addEventListener("resize", ajustarQuantidadeImagens);

    // remove o event listener quando o componente desmontar
    return () => {
      window.removeEventListener("resize", ajustarQuantidadeImagens);
    };
  }, []);

  useEffect(() => {
    // troca as imagens automaticamente a cada 3 segundos
    const intervalo = setInterval(() => {
      setIndiceInicial((indiceAnterior) => (indiceAnterior + 1) % imagens.length);
    }, 3000);

    // limpa o intervalo quando o componente desmontar
    return () => clearInterval(intervalo);
  }, [imagens.length]);

  const pegarImagensExibidas = () => {
    const indiceFinal = indiceInicial + quantidadeImagens;
    // corta o array de imagens com base no indice inicial e na quantidade
    if (indiceFinal <= imagens.length) {
      return imagens.slice(indiceInicial, indiceFinal);
    } else {
      // se passar do tamanho do array, junta as imagens do começo
      return imagens
        .slice(indiceInicial)
        .concat(imagens.slice(0, indiceFinal - imagens.length));
    }
  };

  return (
    <section className="galeria_box">
      <h1>Galeria</h1>
      <div className="linha"></div>
      <br />
      <div
        className="imagens_slide"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px", // espaco entre as imagens
          flexWrap: "nowrap", // impede que quebrem para outra linha
        }}
      >
        {pegarImagensExibidas().map((img, indice) => (
          <img
            key={indice}
            src={img}
            alt={`imagem ${indice + 1}`}
            style={{
              flex: `0 0 calc(${100 / quantidadeImagens}% - 16px)`, // distribui as imagens igualmente
              maxWidth: `calc(${100 / quantidadeImagens}% - 16px)`, // garante que não ultrapassem o espaço
              objectFit: "cover", // ajusta a imagem ao espaco
              borderRadius: "8px",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Galeria;
