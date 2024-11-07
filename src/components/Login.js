import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../estilos/Login.scss'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navegar = useNavigate();

    const handleEnviar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5001/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                // ir para a tela de consulta de quartos
                navegar('/quartos');
            } else {
                setErro(data.message);
            }
        } catch (error) {
            console.error('Erro:', error);
            setErro('Ocorreu um erro ao tentar fazer o login.');
        }
    };

    return (
        <div className="login-container">
        <div className="login">
            <h1> LOGIN </h1>
            <form onSubmit={handleEnviar}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                {erro && <p style={{color: 'red'}}>{erro}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
        </div>
    );
};

export default Login;
