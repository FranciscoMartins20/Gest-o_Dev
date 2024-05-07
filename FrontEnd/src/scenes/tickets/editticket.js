import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTicket, fetchTicketDetails, deleteTicketID, fetchAllCompanies, fetchAllUsers, fetchCompanyNameByNIF, fetchUserDetailsByUsername } from '../../service/api';
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
        Responsible: ''
    });
    const [companies, setCompanies] = useState([]);
    const [users, setUsers] = useState([]);

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
                        Responsible: data.Responsible || ''
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar o ticket:', error);
            }
        };

        loadTicketData();
    }, [ticketId]);

    useEffect(() => {
        const fetchCompaniesAndUsers = async () => {
            try {
                const companiesData = await fetchAllCompanies();
                setCompanies(companiesData);

                const usersData = await fetchAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Erro ao buscar empresas e usuários:', error);
            }
        };

        fetchCompaniesAndUsers();
    }, []);

    const handleSelectChange = (name, selectedOption) => {
        setTicket(prevTicket => ({
            ...prevTicket,
            [name]: selectedOption ? selectedOption.value : ''
        }));
    };

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
            navigate('/ticket');
        } catch (error) {
            console.error('Erro ao atualizar o ticket:', error);
        }
    };

    const handleDeleteTicket = async () => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este ticket?");
        if (confirmDelete) {
            try {
                await deleteTicketID(ticketId);
                navigate('/ticket');
            } catch (error) {
                console.error('Erro ao excluir o ticket:', error);
            }
        }
    };

    // Preparando opções para react-select
    const companyOptions = companies.map(company => ({
        value: company.NIF,
        label: company.Name
    }));
    const userOptions = users.map(user => ({
        value: user.Username,
        label: user.Name
    }));

    // Encontrando opções selecionadas para react-select
    const selectedCompany = companyOptions.find(option => option.value === ticket.Company);
    const selectedUser = userOptions.find(option => option.value === ticket.Responsible);

    return (
        <div className="edit-ticket-page">
            <h1 className="edit-ticket-title">Editar Ticket</h1>
            <button onClick={handleDeleteTicket} className="delete-ticket-button">Excluir Ticket</button>
            <br /><br />
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
                    <Select
                        name="Company"
                        value={selectedCompany}
                        options={companyOptions}
                        onChange={(selected) => handleSelectChange('Company', selected)}
                        placeholder="Selecione uma empresa"
                        isClearable
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
                    <select
                        name="Status"
                        value={ticket.Status || ''}
                        onChange={handleChange}
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Progresso">Em Progresso</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </label>
                <label>
                    Responsável:
                    <Select
                        name="Responsible"
                        value={selectedUser}
                        options={userOptions}
                        onChange={(selected) => handleSelectChange('Responsible', selected)}
                        placeholder="Selecione um responsável"
                        isClearable
                    />
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditTicket;
