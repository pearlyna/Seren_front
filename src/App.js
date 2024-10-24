import React from 'react';
import './App.scss';
import Title from './components/Title';
import Header from './components/Header';
import PaginaIncial from './components/PaginaInicial';
import NossoServico from './components/NossoServico';
import Sobre from './components/Sobre';
import Galeria from './components/Galeria';
import Reserva from './components/Reserva';
import SobreDono from './components/SobreDono';
import Feedbacks from './components/Feedbacks';
import Local from './components/Local';
import Suporte from './components/Suporte';
import Footer from './components/Footer';

function App() {
    return (
        <><div className="App">
            <Title />
            <Header />
            </div>
            
            <div>
            <PaginaIncial />
            </div>

            <div className="App">
            <NossoServico />
            <Sobre />
            <Galeria />
            <Reserva />
            <SobreDono />
            <Feedbacks />
            </div>

            <div>
            <Local />
            </div>
            
            <div className="App">
            <Suporte />
        </div>
        <div>
            <Footer />
        </div></>
    );
}

export default App;
