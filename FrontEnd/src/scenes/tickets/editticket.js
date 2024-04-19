import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTicket, fetchTicketDetails, deleteTicketID } from '../../service/api'; // Certifique-se de que as funções estão exportadas em api.js
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
                    responsavel: data.responsavel
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

    const handleDeleteTicket = async () => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este ticket?");
        if (confirmDelete) {
            try {
                await deleteTicketID(ticketId); // Chama a função para excluir o ticket
                navigate('/ticket'); // Redireciona para a lista de tickets após a exclusão
            } catch (error) {
                console.error('Erro ao excluir o ticket:', error);
                // Implementar tratamento de erro adequado, como exibição de mensagem de erro
            }
        }
    };

    return (
        <div className="edit-ticket-page">
            <h1 className="edit-ticket-title">Editar Ticket</h1>
            <button onClick={handleDeleteTicket} className="delete-ticket-button">Excluir Ticket</button>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit} className="edit-ticket-form">
                <label>
                    Data:
                    <input
                        type="date"
                        name="data"
                        value={ticket.data}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Tempo:
                    <input
                        type="time"
                        name="tempo"
                        value={ticket.tempo}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Empresa:
                    <input
                        type="text"
                        name="empresa"
                        value={ticket.empresa}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Problema:
                    <textarea
                        name="problema"
                        value={ticket.problema}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Resolução:
                    <textarea
                        name="resolucao"
                        value={ticket.resolucao}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Estado:
                    <select
                        name="estado"
                        value={ticket.estado || ''}
                        onChange={handleChange}
                    >
                        <option value="Aberto">Aberto</option>
                        <option value="Em progresso">Em Progresso</option>
                        <option value="Resolvido">Resolvido</option>
                    </select>
                </label>
                <label>
                    Responsável:
                    <select
                        name="responsavel"
                        value={ticket.responsavel}
                        onChange={handleChange}
                    >
                        <option value="Francisco Martins">Francisco Martins</option>
                        <option value="Clara Gomes">Clara Gomes</option>
                    </select>
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
            
        </div>
    );
};

export default EditTicket;
