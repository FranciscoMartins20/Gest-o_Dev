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
    const [responsavel, setResponsavel] = useState('');
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const ticketData = { data, tempo, empresa, problema, resolucao, estado, responsavel };
    
        try {
            const result = await createTicket(ticketData);
            console.log('Ticket criado com sucesso:', result);
            navigate('/ticket');
        } catch (error) {
            console.error('Falha ao criar ticket:', error);
            alert('Falha ao criar ticket: ' + error.message);
        }
        setIsSubmitting(false);
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
                        <option value="Aberto">Aberto</option>
                        <option value="Em progresso">Em Progresso</option>
                        <option value="Resolvido">Resolvido</option>
                    </select>
                </label>
                <br />
                <br />
                <label>
                    Responsável:
                    <select value={responsavel} onChange={e => setResponsavel(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="Francisco Martins">Francisco Martins</option>
                        <option value="Clara Gomes">Clara Gomes</option>
                    </select>

                </label>
                <br />
                <br></br>
               <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Criando...' : 'Criar Ticket'}</button>
            </form>
        </div>
    );
};

export default CreateTicket;
