import React from "react";
import '../estilos/Feedbacks.scss'

const Feedbacks = () => {
return(
<section className="feedback_box">
    <h2>O que os hóspedes estão dizendo</h2>
    <p>Feedback dos hóspedes</p>
    <br />
    <div className="row">
        <div className="feedback">
            <h3>Ana Maria</h3>
            <p>A melhor estadia da minha vida! Proprietário deixou tudo pronto para a minha visita</p>
        </div>
        <div className="feedback">
            <h3>João Pedro</h3>
            <p>Um lugar simplesmente incrível, achei perfeito. Propriedade com tudo que eu desejava e um pouco mais! Se estiver em dúvida não fique, vai por mim vale a pena cada centavo!</p>
        </div>
        <div className="feedback">
            <h3>Maria Silva</h3>
            <p>Localização boa. Eu gostei!</p>
        </div>
    </div>
    <div className="row">
        <div className="feedback">
            <h3>Fernanda Costa</h3>
            <p>Minha família e eu tivemos uma estadia maravilhosa no SERENIVILAR. O quarto era espaçoso e bem decorado. Todo o processo de reserva foi simples e rápido através do WhatsApp. Com certeza voltaremos!</p>
        </div>
        <div className="feedback">
            <h3>Carlos Pereira</h3>
            <p>Minha família e eu tivemos uma estadia maravilhosa!!! O quarto era espaçoso e bem decorado. Todo o processo de reserva foi simples e rápido através do WhatsApp. Super recomendo!</p>
        </div>
        <div className="feedback">
            <h3>Mariana Souza</h3>
            <p>Foi uma experiência incrível! O quarto era limpo, confortável e muito bem localizado. Marcos foi muito atencioso e nos deu ótimas dicas de lugares para visitar na cidade. Sem dúvida, voltarei a me hospedar aqui.</p>
        </div>
    </div>
</section>
);
};
export default Feedbacks;