import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../../service/api'; 

const CreateTicket = () => {
    const [data, setData] = useState('');
    const [tempo, setTempo] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [problema, setProblema] = useState('');
    const [resolucao, setResolucao] = useState('');
    const [estado, setEstado] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const ticketData = { data, tempo, empresa, problema, resolucao, estado };

        try {
            const result = await createTicket(ticketData); // Envia os dados para a API
            console.log('Ticket criado com sucesso:', result);
            navigate('/ticket'); // Redireciona para a lista de tickets ou página de detalhes
        } catch (error) {
            console.error('Falha ao criar ticket:', error);
        }
    };

    return (
        <div>
            <h1>Criar Novo Ticket</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Data:
                    <input
                        type="date"
                        value={data}
                        onChange={e => setData(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Tempo:
                    <input
                        type="time"
                        value={tempo}
                        onChange={e => setTempo(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Empresa:
                    <input
                        type="text"
                        value={empresa}
                        onChange={e => setEmpresa(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Problema:
                    <textarea
                        value={problema}
                        onChange={e => setProblema(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Resolução:
                    <textarea
                        value={resolucao}
                        onChange={e => setResolucao(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Estado:
                    <select value={estado} onChange={e => setEstado(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="aberto">Aberto</option>
                        <option value="em progresso">Em Progresso</option>
                        <option value="resolvido">Resolvido</option>
                    </select>
                </label>
                <br />
                <button type="submit">Criar Ticket</button>
            </form>
        </div>
    );
};

export default CreateTicket;
