import React from "react";
import '../estilos/Reserva.scss';
import img1 from '../assets/imgs/towelsRoom.webp';
import img2 from '../assets/imgs/darblueRoom.jpg';
import img3 from '../assets/imgs/grey_fancy_room.jpg';
import img4 from '../assets/imgs/warm_fancy_room.jpg';
import showerIcon from '../assets/imgs/showerIcon.png';
import bedIcon from '../assets/imgs/bedIcon.png';
import wifiIcon from '../assets/imgs/wifiIcon.png';
import airIcon from '../assets/imgs/airIcon.png';

const Reserva = () => {
return (
<section className="reserva_box">
    <h1>Faça sua reserva</h1>
    <div className="room_container">
        <div className="room_card">
            <img className="room_img" src={img1} alt="Quarto Standard" />
            <h3>Quarto Standard</h3>
            <p className="status">Indisponível</p>
            <div className="amenities">
                <div><img src={showerIcon} alt="Banheiro Icon" /> Banheiro privado</div>
                <div><img src={bedIcon} alt="Cama Icon" /> 160 cm x 200 cm</div>
                <div><img src={wifiIcon} alt="Wi-Fi Icon" /> Wi-Fi gratuito</div>
                <div><img src={airIcon} alt="Ar-condicionado Icon" /> Ar-condicionado</div>
            </div>
            <div className="avaliacao_button">
                <span>9.1</span>
                <p>1,500 avaliações</p>
            </div>
            <p className="preco">R$ 400</p>
        </div>

        <div className="room_card">
            <img className="room_img" src={img2} alt="Quarto Deluxe" />
            <h3>Quarto Deluxe</h3>
            <p className="status">Disponível</p>
            <div className="amenities">
                <div><img src={showerIcon} alt="Banheiro Icon" /> Banheiro privado</div>
                <div><img src={bedIcon} alt="Cama Icon" /> 100 cm x 200 cm</div>
                <div><img src={wifiIcon} alt="Wi-Fi Icon" /> Wi-Fi</div>
                <div><img src={airIcon} alt="Ar-condicionado Icon" /> Ar-condicionado</div>
            </div>
            <div className="avaliacao_button">
                <span>9.5</span>
                <p>1,000 avaliações</p>
            </div>
            <p className="preco">R$ 350</p>
        </div>

        <div className="room_card">
            <img className="room_img" src={img3} alt="Quarto Economico" />
            <h3>Quarto Econômico</h3>
            <p className="status">Indisponível</p>
            <div className="amenities">
                <div><img src={showerIcon} alt="Banheiro Icon" /> Banheiro privado</div>
                <div><img src={bedIcon} alt="Cama Icon" /> 140 cm x 200 cm</div>
                <div><img src={wifiIcon} alt="Wi-Fi Icon" /> Wi-Fi gratuito</div>
                <div><img src={airIcon} alt="Ar-condicionado Icon" /> Ar-condicionado</div>
            </div>
            <div className="avaliacao_button">
                <span>8.5</span>
                <p>1,000 avaliações</p>
            </div>
            <p className="preco">R$ 480</p>
        </div>

        <div className="room_card">
            <img className="room_img" src={img4} alt="Quarto King" />
            <h3>Quarto King</h3>
            <p className="status">Disponível</p>
            <div className="amenities">
                <div><img src={showerIcon} alt="Banheiro Icon" /> Banheiro privado</div>
                <div><img src={bedIcon} alt="Cama Icon" /> 193 cm x 200 cm</div>
                <div><img src={wifiIcon} alt="Wi-Fi Icon" /> Wi-Fi gratuito</div>
                <div><img src={airIcon} alt="Ar-condicionado Icon" /> Ar-condicionado</div>
            </div>
            <div className="avaliacao_button">
                <span>6.5</span>
                <p>500 avaliações</p>
            </div>
            <p className="preco">R$ 650</p>
        </div>
    </div>
</section>
);
};

export default Reserva;