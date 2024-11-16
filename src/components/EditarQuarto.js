import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../estilos/EditarQuarto.scss";
import { API_URL } from '../api/constants'

const EditarQuarto = () => {
  const { id } = useParams(); // obter o id do quarto da url
  const navegar = useNavigate();

  // Eestado inicial dos dados do quarto
  const [estadoInicial, setEstadoInicial] = useState({
    nome: "",
    banheiro: "Banheiro privado",
    tam_cama: "",
    wifi: "wifi",
    ar_condi: "arcondicionado",
    classi_avaliacao: 0,
    num_avaliacao: 0,
    valor: 0,
    status_quar: "Disponível",
    imagem: null,
  });

  // estado do form
  const [formulario, setFormulario] = useState(estadoInicial);

  // para controlar o carregamento
  const [carregando, setCarregando] = useState(true);

  // para armazenar a url da imagem anterior
  const [imagemAnterior, setImagemAnterior] = useState(null);

  useEffect(() => {
    const buscarDadosQuarto = async () => {
      try {
        const resposta = await axios.get(`${API_URL}/quarto/${id}`);
        const dadosQuarto = resposta.data;

        // atualizar o estado inicial e o form com os dados do quarto
        const estadoFormatado = {
          nome: dadosQuarto.nome,
          banheiro: dadosQuarto.banheiro,
          tam_cama: dadosQuarto.tam_cama,
          wifi: dadosQuarto.wifi,
          ar_condi: dadosQuarto.ar_condi,
          classi_avaliacao: dadosQuarto.classi_avaliacao,
          num_avaliacao: dadosQuarto.num_avaliacao.toString(),
          valor: dadosQuarto.valor,
          status_quar: dadosQuarto.status_quar,
          imagem: null,
        };

        setEstadoInicial(estadoFormatado);
        setFormulario(estadoFormatado); // preencher o form com os dados carregados
        setImagemAnterior(dadosQuarto.imagem); // definir a url da imagem anterior
        setCarregando(false);
      } catch (erro) {
        console.error("Erro ao buscar dados do quarto:", erro);
        alert(`Erro: ${erro.message}`);
        setCarregando(false);
      }
    };

    buscarDadosQuarto();
  }, [id]);

  const handleMudar = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleNumero = (e) => {
    const { name, value } = e.target;
    const valorNumerico = value.replace(/\D/g, "");
    const valorFormatado = valorNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: valorFormatado,
    }));
  };

  const handleImagem = (e) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      imagem: e.target.files[0],
    }));
  };

  const handleEnviar = async (e) => {
    e.preventDefault(); 

    try {
<<<<<<< HEAD
      // enviar os dados do quarto para o backend sem imagem
      const dadosQuarto = {
=======
      await axios.put(`${API_URL}/quarto/${id}`, {
>>>>>>> c86b4ed64de0b8ce6358ea4c1c7e3aa436faea1b
        nome: formulario.nome,
        banheiro: formulario.banheiro,
        tam_cama: formulario.tam_cama,
        wifi: formulario.wifi,
        ar_condi: formulario.ar_condi,
        classi_avaliacao: formulario.classi_avaliacao,
        num_avaliacao: formulario.num_avaliacao.replace(/,/g, ""),
        status_quar: formulario.status_quar,
        valor: formulario.valor,
      };

      // enviar o quarto sem a imagem caso o user nao fez upload
      await axios.put(`http://localhost:5001/quarto/${id}`, dadosQuarto);

      // caso o user faz um upload de uma nova imagem, envia ela para o backend
      if (formulario.imagem) {
        const dadosFormulario = new FormData();
        dadosFormulario.append("imagem", formulario.imagem);

        await axios.put(
          `${API_URL}/quarto/${id}/imagem`,
          dadosFormulario,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert("Quarto atualizado com sucesso!");
      navegar("/quartos");
    } catch (erro) {
      console.error("Erro ao atualizar o quarto:", erro);
      alert(`Erro: ${erro.message}`);
    }
  };


  if (carregando) {
    return <div>Carregando dados do quarto...</div>;
  }

  return (
    <div className="editar_container">
      <h1>Editar Quarto</h1>
        {imagemAnterior ? (
          <img
            src={`http://localhost:5001/${imagemAnterior}`} 
            alt="Imagem do Quarto"
            className="imagem_anterior"
          />
        ) : (
          <p></p>
        )}
      <div className="editar_box">
        <form onSubmit={handleEnviar} className="editar_form">

          <label>
            Nova Imagem:
            <input type="file" name="imagem" onChange={handleImagem} />
          </label>

          <label>
            Banheiro:
            <select
              name="banheiro"
              value={formulario.banheiro}
              onChange={handleMudar}
              required
            >
              <option value="">Selecionar opção</option>
              <option value="Banheiro privado">Banheiro privado</option>
              <option value="Banheiro compartilhado">
                Banheiro compartilhado
              </option>
            </select>
          </label>

          <label>
            Nome do quarto:
            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={handleMudar}
              required
            />
          </label>

          <label>
            WiFi:
            <select
              name="wifi"
              value={formulario.wifi}
              onChange={handleMudar}
              required
            >
              <option value="">Selecionar opção</option>
              <option value="Wifi">Wifi</option>
              <option value="sem Wifi">sem Wifi</option>
            </select>
          </label>

          <label>
            Tamanho da cama:
            <input
              type="text"
              name="tam_cama"
              value={formulario.tam_cama}
              onChange={handleMudar}
              required
            />
          </label>

          <label>
            Ar condicionado:
            <select
              name="ar_condi"
              value={formulario.ar_condi}
              onChange={handleMudar}
              required
            >
              <option value="">Selecionar opção</option>
              <option value="Ar-condicionado">Ar-condicionado</option>
              <option value="sem Ar-condicionado">sem Ar-condicionado</option>
            </select>
          </label>

          <label>
            Classificação de avaliação:
            <input
              type="number"
              name="classi_avaliacao"
              value={formulario.classi_avaliacao}
              onChange={handleMudar}
              required
            />
          </label>

          <label>
            Status de disponibilidade:
            <input
              type="text"
              name="status_quar"
              value={formulario.status_quar}
              onChange={handleMudar}
              disabled
            />
          </label>

          <label>
            Número de Avaliações:
            <input
              type="text"
              name="num_avaliacao"
              value={formulario.num_avaliacao}
              onChange={handleNumero}
              required
            />
          </label>

          <label>
            Valor:
            <input
              type="number"
              name="valor"
              value={formulario.valor}
              onChange={handleMudar}
              required
            />
          </label>

          <button type="submit" className="form_botao full-width">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarQuarto;
