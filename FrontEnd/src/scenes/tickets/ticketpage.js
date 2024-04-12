import React, { useState, useEffect } from 'react';
import { fetchTickets } from '../../service/api'; // Certifique-se de que o caminho está correto
import './ticketpage.css';

const TicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para carregar os tickets do servidor utilizando axios
    const loadTickets = async () => {
        try {
            const data = await fetchTickets();
            setTickets(data);
            setError(null);
        } catch (error) {
            setError('Falha ao buscar tickets: ' + error.message);
        }
        setIsLoading(false);
    };

    // Carregar os tickets ao montar o componente
    useEffect(() => {
        loadTickets();
    }, []);

    return (
        <div>
            <h1>Lista de Tickets</h1>
            {isLoading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>Erro: {error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Tempo</th>
                            <th>Empresa</th>
                            <th>Problema</th>
                            <th>Resolução</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.data}</td>
                                <td>{ticket.tempo}</td>
                                <td>{ticket.empresa}</td>
                                <td>{ticket.problema}</td>
                                <td>{ticket.resolucao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TicketPage;
