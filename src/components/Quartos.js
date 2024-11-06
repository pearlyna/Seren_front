import React, { useState, useEffect } from 'react';
import '../estilos/Quartos.scss'; 

const Quartos = () => {
  const [quartos, setQuartos] = useState([]);
  const [erro, setErro] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    nome: '',
    banheiro: '',
    cama: '',
    wifi: false,
    arcondicionado: false,
    avaliacao: '',
    numero: '',
    status: 'Disponível',
    valor: ''
  });

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
    console.log(`Editing room with id: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/quarto/${id}`, { method: 'DELETE' });
      setQuartos(quartos.filter((quarto) => quarto.id !== id));
    } catch (error) {
      console.error('Erro ao deletar quarto:', error);
    }
  };

  const handleReserve = (id) => {
    console.log(`Reserving room with id: ${id}`);
  };

  const handleAddRoom = () => {
    setShowAddForm(!showAddForm);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/quarto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      });
      if (response.ok) {
        const newRoomData = await response.json();
        setQuartos([...quartos, { ...newRoom, id: newRoomData.id }]);
        setShowAddForm(false);
        setNewRoom({
          nome: '',
          banheiro: '',
          cama: '',
          wifi: false,
          arcondicionado: false,
          avaliacao: '',
          numero: '',
          status: 'Disponível',
          valor: '',
        });
      } else {
        setErro('Erro ao adicionar quarto');
      }
    } catch (error) {
      console.error('Erro ao adicionar quarto:', error);
    }
  };

  return (
    <div className="room_management">
      <h1>Gerenciamento dos Quartos</h1>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div className="add_room">
        <button onClick={handleAddRoom}>Adicionar Quarto</button>
      </div>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="add_room_form">
          <input
            type="text"
            name="nome"
            placeholder="Nome do Quarto"
            value={newRoom.nome}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="banheiro"
            placeholder="Tipo de Banheiro"
            value={newRoom.banheiro}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="cama"
            placeholder="Tamanho da Cama"
            value={newRoom.cama}
            onChange={handleFormChange}
            required
          />
          <input
            type="number"
            name="valor"
            placeholder="Preço"
            value={newRoom.valor}
            onChange={handleFormChange}
            required
          />
          <button type="submit">Salvar Quarto</button>
        </form>
      )}
      <div className="room_container">
        {quartos.map((quarto) => (
          <div className="room_card" key={quarto.id}>
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
            <div className="action_buttons">
              <button className="edit" onClick={() => handleEdit(quarto.id)}>Editar</button>
              <button className="delete" onClick={() => handleDelete(quarto.id)}>Apagar</button>
              <button className="reserve" onClick={() => handleReserve(quarto.id)}>Reserva</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quartos;
