import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { createTicket, fetchAllCompanies, fetchAllUsers, fetchCompanyNameByNIF } from '../../service/api';
import "./createticket.css";

const CreateTicket = () => {
    const navigate = useNavigate();
    const [Date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [CompanyNIF, setCompanyNIF] = useState('');
    const [Problem, setProblem] = useState('');
    const [Resolution, setResolution] = useState('');
    const [Status, setStatus] = useState('');
    const [Responsible, setResponsible] = useState('');
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const companiesData = await fetchAllCompanies();
                setCompanies(companiesData);
            } catch (error) {
                console.error('Erro ao buscar empresas:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const usersData = await fetchAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchCompanies();
        fetchUsers();
    }, []);

    const fetchCompanyName = async (NIF) => {
        try {
            const companyName = await fetchCompanyNameByNIF(NIF);
            // Você pode usar a variável `companyName` para exibir em algum lugar se necessário
        } catch (error) {
            console.error('Erro ao buscar nome da empresa:', error);
        }
    };

    const handleSelectChange = (setter, selectedOption) => {
        setter(selectedOption ? selectedOption.value : '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const ticketData = {
            Date,
            Time,
            Company: CompanyNIF,
            Problem,
            Resolution,
            Status,
            Responsible
        };

        try {
            await createTicket(ticketData);
            navigate('/ticket');
        } catch (error) {
            console.error('Falha ao criar ticket:', error);
            alert('Falha ao criar ticket: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const companyOptions = companies.map(company => ({
        value: company.NIF,
        label: company.Name
    }));
    const userOptions = users.map(user => ({
        value: user.Username,
        label: user.Name
    }));

    const selectedCompany = companyOptions.find(option => option.value === CompanyNIF);
    const selectedUser = userOptions.find(option => option.value === Responsible);

    return (
        <div className="create-ticket-page">
            <h1>Criar Novo Ticket</h1>
            <form onSubmit={handleSubmit} className="edit-ticket-form">
                <label>
                    Data:
                    <input
                        type="date"
                        value={Date}
                        onChange={e => setDate(e.target.value)}
                    />
                </label>
                <label>
                    Tempo:
                    <input
                        type="time"
                        value={Time}
                        onChange={e => setTime(e.target.value)}
                    />
                </label>
                <label>
                    Empresa:
                    <Select
                        value={selectedCompany}
                        options={companyOptions}
                        onChange={(selected) => {
                            handleSelectChange(setCompanyNIF, selected);
                            fetchCompanyName(selected ? selected.value : '');
                        }}
                        placeholder="Selecione uma empresa"
                        isClearable
                    />
                </label>
                <label>
                    Responsável:
                    <Select
                        value={selectedUser}
                        options={userOptions}
                        onChange={(selected) => handleSelectChange(setResponsible, selected)}
                        placeholder="Selecione um responsável"
                        isClearable
                    />
                </label>
                <label>
                    Problema:
                    <textarea
                        value={Problem}
                        onChange={e => setProblem(e.target.value)}
                    />
                </label>
                <label>
                    Resolução:
                    <textarea
                        value={Resolution}
                        onChange={e => setResolution(e.target.value)}
                    />
                </label>
                <label>
                    Estado:
                    <select value={Status} onChange={e => setStatus(e.target.value)}>
                        <option value="Pendente">Pendente</option>
                        <option value="Em Progresso">Em Progresso</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Criando...' : 'Criar Ticket'}
                </button>
            </form>
        </div>
    );
};

export default CreateTicket;
