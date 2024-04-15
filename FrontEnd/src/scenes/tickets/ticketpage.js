import React, { useState, useEffect } from 'react';
import { fetchTickets } from '../../service/api'; // Certifique-se de que o caminho está correto
import './ticketpage.css';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';


// Função para converter uma data ISO para o número serial do Excel
function isoDateToExcelDate(isoDate) {
    const date = new Date(isoDate);
    const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // Excel epoch starts at 30th December 1899
    const delta = date - excelEpoch; // milliseconds between UTC date and Excel epoch
    return delta / (24 * 60 * 60 * 1000) + 1; // convert to days + adjustment
}

const exportToExcel = (tickets, fileName) => {
    const headers = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Data', key: 'data', width: 15 },
        { header: 'Tempo', key: 'tempo', width: 10 },
        { header: 'Empresa', key: 'empresa', width: 20 },
        { header: 'Problema', key: 'problema', width: 30 },
        { header: 'Resolução', key: 'resolucao', width: 30 },
        { header: 'Estado', key: 'estado', width: 15 },
        { header: 'Responsável', key: 'responsavel', width: 15 }
    ];

    const ws = XLSX.utils.aoa_to_sheet([headers.map(col => col.header)]); // Inserir cabeçalhos na primeira linha
    ws['!cols'] = headers.map(col => ({ wch: col.width })); // Configurar a largura das colunas

    // Adicionar os dados a partir da segunda linha
    tickets.forEach((ticket, rowIndex) => {
        const rowData = headers.map(header => {
            if (header.key === 'data') {
                // Converter a data ISO para o formato Excel
                const excelDate = isoDateToExcelDate(ticket[header.key]);
                return { v: excelDate, t: 'n', z: 'yyyy-mm-dd' };
            } else {
                return ticket[header.key] || '';
            }
        });
        XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: -1 });
    });
    ws['!autofilter'] = { ref: 'A1:H1' }; ws['!autofilter'] = { ref: 'A1:H1' };

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};



const TicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const [filters, setFilters] = useState({ empresa: '', data: '' });
    const clearFilters = () => {
        setFilters({ empresa: '', data: '' });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };


// eslint-disable-next-line react-hooks/exhaustive-deps
const loadTickets = async () => {
    try {
        const data = await fetchTickets();
        const filteredData = data.filter(ticket =>
            (filters.empresa === '' || ticket.empresa.includes(filters.empresa)) &&
            (filters.data === '' || ticket.data === filters.data)
        );
        setTickets(filteredData);
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
    
    useEffect(() => {
        loadTickets();
    }, [filters, loadTickets]); // Dependência de filtros aqui assegura recarga ao mudá-los

 

    return (
        <div>
            <h1>Lista de Tickets</h1>
            <div>
    <input
        type="text"
        name="empresa"
        value={filters.empresa}
        onChange={handleFilterChange}
        placeholder="Filtrar por Empresa"
    />
    <input
        type="date"
        name="data"
        value={filters.data}
        onChange={handleFilterChange}
        placeholder="Filtrar por data"
    />
    <button onClick={clearFilters}>Limpar Filtros</button>
    </div>
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
                            <th>Responsável</th>
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
                                <td>{ticket.responsavel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}

        </div>
    );

};

export default TicketPage;
