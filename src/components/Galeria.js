import React, { useState, useEffect } from "react";
import img1 from '../assets/imgs/living_area.jpg';
import img2 from '../assets/imgs/bathroom_1.jpg';
import img3 from '../assets/imgs/garden_view.jpg';
import img4 from '../assets/imgs/chandelier_room.jpg';
import img5 from '../assets/imgs/grefancy_room.jpg';
import img6 from '../assets/imgs/yard_house.jpg';
import img7 from '../assets/imgs/black_bathroom.jpg';
import img8 from '../assets/imgs/house_at_night.jpg';
import img9 from '../assets/imgs/house_sideview.jpg';
import img10 from '../assets/imgs/house_side_fullview.jpg';
import '../estilos/Galeria.scss';

const Galeria = () => {
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
const [startIndex, setStartIndex] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
}, 3000);
return () => clearInterval(interval);
}, [images.length]);

const getDisplayImages = (isSmallScreen) => {
if (isSmallScreen) {
return [images[startIndex]];
}
const endIndex = startIndex + 4;
if (endIndex <= images.length) { return images.slice(startIndex, endIndex); } else { return images.slice(startIndex).concat(images.slice(0, endIndex - images.length)); } }; const isSmallScreen=window.innerWidth <=768; return ( <section className="galeria_box">
    <h1>Galeria</h1>
    <div className="linha"></div>
    <br />
    <div className="imagens_slide">
        {getDisplayImages(isSmallScreen).map((img, index) => (
        <img key={index} src={img} alt={`img${index + 1}`} />
        ))}
    </div>
    </section>
    );
    };

    export default Galeria;