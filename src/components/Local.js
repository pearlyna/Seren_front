import React from "react";
import imgMap from "../assets/imgs/location_img.png";
import localIcon from "../assets/imgs/location_icon.png";
import imag1 from "../assets/imgs/yardHouse.jpg";
import imag2 from "../assets/imgs/house_side.jpg";
import imag3 from "../assets/imgs/house_night.jpg";
import "../estilos/Local.scss";

const Local = () => {
  return (
    <section id="local" className="local_box">
      <div className="local_container">
      <img className="img-map" src={imgMap} alt="map" />

      <div className="right_box_local">
        <h1>Encontre-nos Aqui</h1>
        <img className="local_icon" src={localIcon} alt="local Icon" />
        <p>
          SERENVILAR - Acomodações Endereço: 
          <br />
          Rua das Flores, 123 - Jardim, São Paulo, SP, 
          <br />
          05675-080, Brasil
        </p>

        <div className="pic_box">
          <img src={imag1} alt="imag1" />
          <img src={imag2} alt="imag2" />
          <img src={imag3} alt="imag3" />
        </div>
      </div>
      </div>
    </section>
  );
};
export default Local;
