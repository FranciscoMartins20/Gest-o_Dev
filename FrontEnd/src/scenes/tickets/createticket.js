import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../../service/api';
import "./createticket.css";

const CreateTicket = () => {
    const navigate = useNavigate();

    // State para os dados do ticket
    const [Date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [Company, setCompany] = useState('');
    const [Problem, setProblem] = useState('');
    const [Resolution, setResolution] = useState('');
    const [Status, setStatus] = useState('');
    const [Responsible, setResponsible] = useState('');

    // State para controlar a submissão do formulário
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        // Criação do objeto ticketData baseado nos estados
        const ticketData = {
            Date: Date,
            Time: Time,
            Company: Company,
            Problem: Problem,
            Resolution: Resolution,
            Status: Status,
            Responsable: Responsible
        };

        try {
            await createTicket(ticketData);
            navigate('/ticket'); // Redirecionar para a página de lista de tickets
        } catch (error) {
            console.error('Falha ao criar ticket:', error);
            alert('Falha ao criar ticket: ' + error.message);
        } finally {
            setIsSubmitting(false); // Resetar o estado de submissão
        }
    };

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
                    <input
                        type="text"
                        value={Company}
                        onChange={e => setCompany(e.target.value)}
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
                    <input
                        type="text"
                        value={Status}
                        onChange={e => setStatus(e.target.value)}
                    />
                </label>
                <label>
                    Responsável:
                    <input
                        type="text"
                        value={Responsible}
                        onChange={e => setResponsible(e.target.value)}
                    />
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Criando...' : 'Criar Ticket'}
                </button>
            </form>
        </div>
    );
};

export default CreateTicket;
