import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../estilos/Quartos.scss';
import showerIcon from '../assets/imgs/showerIcon.png';
import bedIcon from '../assets/imgs/bedIcon.png';
import wifiIcon from '../assets/imgs/wifiIcon.png';
import airIcon from '../assets/imgs/airIcon.png';

const Quartos = () => {
  const navigate = useNavigate();
  const [quartos, setQuartos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchQuartos = async () => {
      try {
        const response = await fetch('http://localhost:5001/quarto');
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Verifique a estrutura e os dados recebidos
          setQuartos(data);
        } else {
          setErro('Erro ao carregar quartos');
        }
      } catch (error) {
        console.error('Erro:', error);
        setErro('Erro ao carregar quartos');
      }
    };

    fetchQuartos();
  }, []);


  const handleAddRoom = () => {
    navigate('/adicionar-quarto');
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/quarto/${id}`, { method: 'DELETE' });
      if (response.ok) {
        // tirar o quarto da lista após a deleção no backend
        setQuartos(quartos.filter((quarto) => quarto.id !== id));
      } else {
        setErro('Erro ao deletar quarto');
      }
    } catch (error) {
      console.error('Erro ao deletar quarto:', error);
      setErro('Erro ao deletar quarto');
    }
  };

  return (
    <div className="room_management">
    <h1>Gerenciamento dos Quartos</h1>
    {erro && <p style={{ color: 'red' }}>{erro}</p>}
    <div className="button_container">
      <button className="button" onClick={handleAddRoom}>Adicionar quarto</button>
    </div>
    <div className="room_container">
      {quartos.map((quarto) => (
        <div key={quarto.id} className="room_wrapper">
      <div className="room_card">
        <img
          src={`http://localhost:5001/${quarto.imagem}`}
          alt="Quarto"
          className="room_img"
        />
        <div className="room_info">
          <h3>{quarto.nome}</h3>
          <p className="status">
            {quarto.status === 'Disponível' ? 'Disponível' : 'Indisponível'}
          </p>
          <div className="amenities">
            <div><img src={showerIcon} alt="Banheiro Icon" />{quarto.banheiro}</div>
            <div><img src={bedIcon} alt="Cama Icon" />{quarto.cama}</div>
            <div><img src={wifiIcon} alt="Wi-Fi Icon" />{quarto.wifi}</div>
            <div><img src={airIcon} alt="Ar-condicionado Icon" />{quarto.arcondicionado}</div>

          </div>
          <div className="avaliacao_button">
            <span>{quarto.avaliacao}</span>
            <p>{quarto.numero} avaliações</p>
          </div>
          <p className="preco">R$ {quarto.valor}</p>
        </div>
      </div>
      <div className="action_buttons">
        <button className="edit" onClick={() => navigate(`/editar-quarto/${quarto.id}`)}>Editar</button>
        <button className="delete" onClick={() => handleDelete(quarto.id)}>Apagar</button>
        <button className="reserve" onClick={() => navigate(`/reserva-quarto/${quarto.id}`)}>Reserva</button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Quartos;
