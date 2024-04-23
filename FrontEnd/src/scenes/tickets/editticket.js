import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTicket, fetchTicketDetails, deleteTicketID, fetchCompanyNameByNIF, fetchUserDetailsByUsername } from '../../service/api';
import "./editicket.css";

const EditTicket = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState({
        Date: '',
        Time: '',
        Company: '',
        Problem: '',
        Resolution: '',
        Status: '',
        Responsable: ''
    });
    const [companyName, setCompanyName] = useState(''); // Estado para armazenar o nome da empresa
    const [responsableName, setResponsableName] = useState(''); // Estado para armazenar o nome do responsável

    useEffect(() => {
        const loadTicketData = async () => {
            try {
                const data = await fetchTicketDetails(ticketId);
                if (data) {
                    setTicket({
                        Date: data.Date ? data.Date.split('T')[0] : '',
                        Time: data.Time || '',
                        Company: data.Company || '',
                        Problem: data.Problem || '',
                        Resolution: data.Resolution || '',
                        Status: data.Status || '',
                        Responsable: data.Responsable || ''
                    });
                    // Carregar o nome da empresa com base no NIF
                    const name = await fetchCompanyNameByNIF(data.Company);
                    setCompanyName(name);

                    // Carregar o nome do responsável com base no username
                    const userDetails = await fetchUserDetailsByUsername(data.Responsable);
                    setResponsableName(userDetails.Name);
                }
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
                        name="Date"
                        value={ticket.Date}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Tempo:
                    <input
                        type="time"
                        name="Time"
                        value={ticket.Time}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Empresa:
                    <input
                        type="text"
                        name="Company"
                        value={companyName} // Exibe o nome da empresa em vez do NIF
                        onChange={handleChange}
                        disabled // Desabilita a edição do campo
                    />
                </label>
                <label>
                    Problema:
                    <textarea
                        name="Problem"
                        value={ticket.Problem}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Resolução:
                    <textarea
                        name="Resolution"
                        value={ticket.Resolution}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Estado:
                    <textarea
                        name="Status"
                        value={ticket.Status || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Responsável:
                    <input
                        type="text"
                        name="Responsable"
                        value={responsableName} // Exibe o nome do responsável
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditTicket;
