import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Quartos.scss';

function AddQuarto() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    banheiro: '',
    cama: '',
    wifi: 'não',
    arcondicionado: 'não',
    avaliacao: 0,
    numero: 0,
    valor: 0,
    status: 'disponível',
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imagem: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
    });

    try {
        const response = await fetch('http://localhost:5001/quarto', { // URL completa do endpoint
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar o quarto');
        }

        const result = await response.json();
        alert('Quarto adicionado com sucesso!');
        navigate('/quartos');
    } catch (error) {
        console.error('Erro ao salvar o quarto:', error);
        alert(`Erro: ${error.message}`);
    }
};


  return (
    <div className="add_room_form_container">
      <h1>Adicionar Novo Quarto</h1>
      <form onSubmit={handleSubmit} className="add_room_form">
        <label>
          Nome:
          <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
        </label>
        
        <label>
          Banheiro:
          <select name="banheiro" value={form.banheiro} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
        </label>

        <label>
          Cama:
          <input type="text" name="cama" value={form.cama} onChange={handleChange} required />
        </label>

        <label>
          Wi-Fi:
          <select name="wifi" value={form.wifi} onChange={handleChange} required>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
        </label>

        <label>
          Ar-condicionado:
          <select name="arcondicionado" value={form.arcondicionado} onChange={handleChange} required>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
          </select>
        </label>

        <label>
          Avaliação:
          <input type="number" name="avaliacao" value={form.avaliacao} onChange={handleChange} min="0" max="10" required />
        </label>

        <label>
          Número de Avaliações:
          <input type="number" name="numero" value={form.numero} onChange={handleChange} required />
        </label>

        <label>
          Valor:
          <input type="number" name="valor" value={form.valor} onChange={handleChange} required />
        </label>

        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange} required>
            <option value="disponível">Disponível</option>
            <option value="indisponível">Indisponível</option>
          </select>
        </label>

        <label>
          Imagem:
          <input type="file" name="imagem" onChange={handleFileChange} />
        </label>
        
        <button type="submit">Adicionar Quarto</button>
      </form>
    </div>
  );
}

export default AddQuarto;
