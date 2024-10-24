import React from "react";
import infoIcon from '../assets/imgs/info_logo.png'
import SegurancaIcon from '../assets/imgs/segurança_icon.png'
import SuporteIcon from '../assets/imgs/suporte_icon.png';
import '../estilos/NossoServico.scss';

const NossoServico = () => {
return (
<section className="nosso_servico">
    <div className="text-box">
        <h1>
            <span className="text_1">Porque</span>
            <span className="text_2">Escolher Nosso Serviço?</span>
        </h1>

        <section className="content_box">
            <div className="info_box">
                <h2>Informações Detalhadas</h2>
                <p>Descrição completas e fotos de alta <br />
                    qualidade para cada quarto
                </p>
                <img className="info_icon" src={infoIcon} alt='info icon' />
            </div>

            <div className="seguranca_box">
                <h2>Reservas Seguras</h2>
                <p>Processo de reserva fácil e <br />
                    seguro, com confirmação <br />
                    imediata.
                </p>
                <img className="seguranca_icon" src={SegurancaIcon} alt="seguranca icon" />
            </div>

            <div className="suporteCli_box">
                <h2>Suporte ao Cliente</h2>
                <p>Assistência disponível 24/7<br />
                    para responder todas as <br />
                    suas dúvidas.
                </p>
                <img className="suporte_icon" src={SuporteIcon} alt="suporte icon" />
            </div>
        </section>
    </div>
</section>
);
};
export default NossoServico;