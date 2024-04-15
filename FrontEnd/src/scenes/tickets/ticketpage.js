import React, { useState, useEffect } from 'react';
import { fetchTickets } from '../../service/api'; // Certifique-se de que o caminho está correto
import './ticketpage.css';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const exportToExcel = (tickets, fileName) => {
    // Definir os cabeçalhos das colunas
    const headers = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Data', key: 'data', width: 15 },
        { header: 'Tempo', key: 'tempo', width: 10 },
        { header: 'Empresa', key: 'empresa', width: 20 },
        { header: 'Problema', key: 'problema', width: 30 },
        { header: 'Resolução', key: 'resolucao', width: 30 },
        { header: 'Estado', key: 'estado', width: 15 }
    ];

    // Converter dados para uma folha de trabalho com cabeçalhos
    const ws = XLSX.utils.json_to_sheet(tickets, { header: headers.map(col => col.key), skipHeader: true });

    // Adicionar os cabeçalhos manualmente e aplicar estilos
    headers.forEach((col, index) => {
        const ref = XLSX.utils.encode_col(index) + "1"; // Cria referência da célula, como A1, B1, etc.
        ws[ref] = {
            v: col.header, t: 's', s: {
                font: { bold: true },
                fill: { fgColor: { rgb: "FFFFAA00" } },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            }
        };
    });

    // Ajustar a largura das colunas
    ws['!cols'] = headers.map(col => ({ wch: col.width }));

    // Criar novo workbook e adicionar a worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");

    // Escrever o arquivo Excel
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};



const TicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const navigate = useNavigate();

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

    const handleCreateTicket = () => {
        navigate('/create-ticket');  // Atualize para o caminho correto conforme seu roteador
    };

    const handleRowClick = (ticketId) => {
        navigate(`/edit-ticket/${ticketId}`);
    };

    // Carregar os tickets ao montar o componente
    useEffect(() => {
        loadTickets();
    }, []);

    return (
        <div>
            <h1>Lista de Tickets</h1>
            <button onClick={() => exportToExcel(tickets, 'Lista_de_Tickets')}>Exportar para Excel</button>
            <button onClick={handleCreateTicket}>Criar Novo Ticket</button>
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
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)}>
                                <td>{ticket.id}</td>
                                <td>{new Date(ticket.data).toLocaleDateString()}</td>
                                <td>{ticket.tempo}</td>
                                <td>{ticket.empresa}</td>
                                <td>{ticket.problema}</td>
                                <td>{ticket.resolucao}</td>
                                <td>{ticket.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}

        </div>
    );

};

export default TicketPage;
