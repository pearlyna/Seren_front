import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditarQuarto = () => {
const { id } = useParams();
const [novoQuarto, setNovoQuarto] = useState({
nome: '',
banheiro: '',
cama: '',
valor: '',
wifi: 'sem_wifi',
arcondicionado: 'sem_arcondicionado',
imagem: null,
});
const [erro, setErro] = useState(null);

useEffect(() => {

const carregarDadosQuarto = async () => {
try {
const response = await axios.get(`/quarto/${id}`);
setNovoQuarto(response.data);
} catch (error) {
setErro('Erro ao carregar os dados do quarto.');
}
};
carregarDadosQuarto();
}, [id]);

const handleAlterarCampo = (event) => {
const { name, value } = event.target;
setNovoQuarto((prevState) => ({
...prevState,
[name]: value,
}));
};

const handleAlterarArquivo = (event) => {
const file = event.target.files[0];
setNovoQuarto((prevState) => ({
...prevState,
imagem: file,
}));
};

const handleSubmit = async (event) => {
event.preventDefault();
const formData = new FormData();

Object.keys(novoQuarto).forEach((key) => {
formData.append(key, novoQuarto[key]);
});

try {
await axios.put(`/quarto/${id}`, formData, {
headers: {
'Content-Type': 'multipart/form-data',
},
});
alert('Quarto atualizado com sucesso!');
} catch (error) {
setErro('Erro ao salvar as alterações.');
}
};

return (
<div className="add_room_form_container">
    <h1>Editar Quarto </h1>
    {erro && <p style={{ color: 'red' }}>{erro}</p>}
    <form onSubmit={handleSubmit} className="add_room_form">
        <input type="text" name="nome" placeholder="Nome do Quarto" value={novoQuarto.nome} onChange={handleAlterarCampo} required />
        <input type="text" name="banheiro" placeholder="Tipo de Banheiro" value={novoQuarto.banheiro} onChange={handleAlterarCampo} required />
        <input type="text" name="cama" placeholder="Tamanho da Cama" value={novoQuarto.cama} onChange={handleAlterarCampo} required />
        <input type="number" name="valor" placeholder="Preço" value={novoQuarto.valor} onChange={handleAlterarCampo} step="0.01" required />
        <select name="wifi" value={novoQuarto.wifi} onChange={handleAlterarCampo} required>
            <option value="sem_wifi">Sem Wi-Fi</option>
            <option value="wifi">Wi-Fi</option>
        </select>
        <select name="arcondicionado" value={novoQuarto.arcondicionado} onChange={handleAlterarCampo} required>
            <option value="sem_arcondicionado">Sem Ar-condicionado</option>
            <option value="arcondicionado">Ar-condicionado</option>
        </select>
        <input type="file" name="imagem" onChange={handleAlterarArquivo} />
        <button type="submit">Salvar Quarto</button>
    </form>
</div>
);
};

export default EditarQuarto;