import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Quartos.scss';

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

  const handleEdit = (id) => {
    navigate(`/editar-quarto/${id}`);
  };

  const handleReserve = (id) => {
    navigate(`/reserva-quarto/${id}`);
  };

  const handleAddRoom = () => {
    navigate('/adicionar-quarto');
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/quarto/${id}`, { method: 'DELETE' });
      if (response.ok) {
        // Remove o quarto da lista localmente após a deleção no backend
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
      <div className="add_room">
        <button onClick={handleAddRoom}>Adicionar Quarto</button>
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
            <div>{quarto.banheiro}</div>
            <div>{quarto.cama}</div>
            <div>{quarto.wifi ? 'Wi-Fi gratuito' : 'Sem Wi-Fi'}</div>
            <div>{quarto.arcondicionado ? 'Ar-condicionado' : 'Sem ar-condicionado'}</div>
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
