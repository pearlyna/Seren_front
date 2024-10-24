import React from "react";
import whatsAppIcon from '../assets/imgs/whatsIcon.png';
import imgDono from '../assets/imgs/dono-img.png';
import '../estilos/SobreDono.scss'

const SobreDono = () => {
return (
<section className="sobre_box">
    <div className="text_box">
        <h1>SOBRE MIM</h1>
        <h2>Marcos Monteiro</h2>
        <p>
            <span className="sobre_dono">
                hshsOlá, sou Marcos Monteiro, o fundador do SERENVILAR, um espaço <br />
                dedicado a oferecer acomodações excepcionais para você. Com uma <br />
                paixão por hospitalidade e um olho atento aos detalhes, criei o  <br />
                SERENVILARpara ser mais do que um simples lugar para ficar.
            </span>

        <h3>Minha Jornada</h3>
        <span className="jornada">
            Minha trajetória começou com um desejo profundo de proporcionar <br />
            experiências memoráveis aos meus hóspedes. Cada quarto e cada <br />
            detalhe são cuidadosamente pensados para garantir conforto, <br />
            segurança e uma estadia inesquecível.
        </span>

        <span className="contato_text">
            Caso esteja interessado para fazer uma reserva, por favor entre em <br />
            contato pelo meu whatsapp para realizar sua estadia!
        </span>
        </p>

        <div className="links">
            <button className="whats_botao">
                <img className="whatsIcon" src={whatsAppIcon} alt="whatsApp Icon" />
                551197230-3922
            </button>
            <div className="email">
                <a href="mailto:serenvilar.br@gmail.com">marcosmon@gmail.com</a>
            </div>
        </div>
    </div>

    <div className="img_box">
        <img className="imgDono" src={imgDono} alt="imagem Dono" />
    </div>

</section>
);
};
export default SobreDono;