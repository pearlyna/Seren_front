import React from "react";
import img1 from '../assets/imgs/img_merged.jpg';
import '../estilos/PaginaInicial.scss';

const PaginaInicial = () => {
return (
<section className="pagina_container">
    <div className="pagina_box">
        <div className="image_box">
            <img className="img1" src={img1} alt='Quarto com grande janela' />
        </div>
        <div className="text_caixa">
            <h2>Encontre o Quarto <br />
                Perfeito para sua <br />Estadia</h2>
            <p>No nosso site, encontrar o quarto ideal é simples e rápido. <br />
                Nossa plataforma permite que você navegue por uma variedade <br />
                de opções de hospedagem, todas cuidadosamente selecionadas para <br />
                garantir uma estadia confortável e conveniente.</p>
            <button className="button">Saiba Mais</button>
        </div>
    </div>
</section>
);
};

export default PaginaInicial;