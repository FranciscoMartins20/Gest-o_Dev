import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTicket, fetchTicketDetails } from '../../service/api'; // Certifique-se de que as funções estão exportadas em api.js
import "./editicket.css";



const EditTicket = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState({
        data: '',
        tempo: '',
        empresa: '',
        problema: '',
        resolucao: '',
        estado: '',
        responsavel :''
    });

    useEffect(() => {
        const loadTicketData = async () => {
            try {
                const data = await fetchTicketDetails(ticketId);
                setTicket(prevTicket => ({
                    ...prevTicket,
                    data: data.data ? data.data.split('T')[0] : '', // Ajuste da data
                    tempo: data.tempo,
                    empresa: data.empresa,
                    problema: data.problema,
                    resolucao: data.resolucao,
                    estado: data.estado,
                    responsavel:data.responsavel
                }));
            } catch (error) {
                console.error('Erro ao buscar o ticket:', error);
                // Tratamento de erro adicional, como notificação ao usuário
            }
        };
    
        loadTicketData();
    }, [ticketId]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket(prevTicket => ({
            ...prevTicket,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateTicket(ticketId, ticket);
            navigate('/ticket'); // Redirecionar para a lista de tickets após a atualização
        } catch (error) {
            console.error('Erro ao atualizar o ticket:', error);
            // Implementar tratamento de erro adequado, como exibição de mensagem de erro
        }
    };

    return (
        <div>
            <h1>Editar Ticket</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Data:
                    <input
                        type="date"
                        name="data"
                        value={ticket.data}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Tempo:
                    <input
                        type="time"
                        name="tempo"
                        value={ticket.tempo}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Empresa:
                    <input
                        type="text"
                        name="empresa"
                        value={ticket.empresa}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Problema:
                    <textarea
                        name="problema"
                        value={ticket.problema}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Resolução:
                    <textarea
                        name="resolucao"
                        value={ticket.resolucao}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Estado:
                    <select
                        name="estado"
                        value={ticket.estado || ''}
                        onChange={handleChange}
                    >
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
                    <select
                        name="responsavel"
                        value={ticket.responsavel}
                        onChange={handleChange}
                    >
                        <option value="">Selecione</option>
                        <option value="Francisco Martins">Francisco Martins</option>
                        <option value="Clara Gomes">Clara Gomes</option>
                    </select>
                </label>
                <br />
                <br></br>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditTicket;
