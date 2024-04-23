import React, { useState, useEffect } from 'react';
import { fetchTickets } from '../../service/api'; // Certifique-se de que o caminho está correto
import './ticketpage.css';
import ExcelJS from 'exceljs';
import { useNavigate } from 'react-router-dom';
import imagem_info from "./assets/imagem_info_data";

const exportToExcel = async (tickets, fileName, month, year, responsible) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tickets');

    // Adicionar um título formatado que ocupa mais espaço e tem um estilo mais refinado
    worksheet.mergeCells('A1', 'G3');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'InfoDevelop Tickets\nReport';
    titleCell.font = { name: 'Calibri', size: 18, bold: true, color: { argb: 'FF6A8DAD' } };
    titleCell.fill = { type: 'pattern', pattern: 'none' };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

    // Adicionar um logotipo quadrado ao lado do título
    const logo = workbook.addImage({
        base64: imagem_info,
        extension: 'png',
    });
    // Supondo que o tamanho da célula e do logotipo sejam ajustados para um quadrado perfeito
    worksheet.addImage(logo, 'H1:I5'); // Adapte conforme necessário para o tamanho do logotipo

    // Espaço antes dos cabeçalhos
    worksheet.addRow([]);
    worksheet.addRow([]);

    worksheet.views = [{ showGridLines: false }];

    // Definir cabeçalhos da tabela
    const headers = [
        { name: 'Data', key: 'Date', width: 15 },
        { name: 'Tempo', key: 'Time', width: 10 },
        { name: 'Empresa', key: 'Company', width: 20 },
        { name: 'Problema', key: 'Problem', width: 30 },
        { name: 'Resolução', key: 'Resolution', width: 30 },
        { name: 'Estado', key: 'Status', width: 15 },
        { name: 'Responsável', key: 'Responsible', width: 15 }
    ];

    worksheet.columns = headers.map(col => ({
        key: col.key,
        width: col.width
    }));

    // Adicionar uma tabela com formatação estilo Excel
    const table = worksheet.addTable({
        name: 'TicketsTable',
        ref: 'A6',
        headerRow: true,
        totalsRow: false,
        style: {
            theme: 'TableStyleLight9',
            showRowStripes: true,
        },
        columns: headers.map(header => ({
            name: header.name,
            filterButton: true
        })),
        rows: tickets.map(ticket => headers.map(header => ticket[header.key]))
    });

    table.commit(); // Finaliza a adição da tabela

    // Ajustar automaticamente o tamanho das colunas
    worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
            let cellLength = cell.value ? cell.value.toString().length : 0;
            if (cellLength > maxLength) {
                maxLength = cellLength;
            }
        });
        column.width = maxLength < 10 ? 10 : maxLength + 2; // adiciona espaço extra para estética
    });

    // Escrever o arquivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `${fileName}_${month}_${year}_${responsible}.xlsx`);
};

// Função para salvar o arquivo
function saveAs(blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
}

const TicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        Company: '',
        Date: '',
        Month: '',
        Year: '',
        Responsible: ''
    });
    
    const clearFilters = () => {
        setFilters({
            Company: '',
            Date: '',
            Month: '',
            Year: '',
            Responsible: ''
        });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const loadTickets = async () => {
        try {
            const data = await fetchTickets();
            const filteredData = data.filter(ticket => {
                const ticketDate = new Date(ticket.Date);
                const filterDate = filters.Date ? new Date(filters.Date) : null;
            
                const ticketDateString = `${('0' + ticketDate.getDate()).slice(-2)}-${('0' + (ticketDate.getMonth() + 1)).slice(-2)}-${ticketDate.getFullYear()}`;
                const filterDateString = filterDate ? `${('0' + filterDate.getDate()).slice(-2)}-${('0' + (filterDate.getMonth() + 1)).slice(-2)}-${filterDate.getFullYear()}` : null;
            
                return (filters.Company === '' || ticket.Company.includes(filters.Company)) &&
                    (filters.Date === '' || ticketDateString === filterDateString) &&
                    (filters.Month === '' || ticketDate.getMonth() + 1 === parseInt(filters.Month)) &&
                    (filters.Year === '' || ticketDate.getFullYear() === parseInt(filters.Year)) &&
                    (filters.Responsible === '' || ticket.Responsible === filters.Responsible);
            });
            
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

    const handleExportExcel = () => {
        const { Month, Year, Responsible } = filters;
        exportToExcel(tickets, 'Lista_de_Tickets', Month, Year, Responsible);
    };

    useEffect(() => {
        loadTickets();
    }, [filters]); // Dependência de filtros aqui assegura recarga ao mudá-los

    return (
        <div className="ticket-page">
            <h1 className="ticket-title">Lista de Tickets</h1>
            <div className="filter-container">
                <input
                    type="text"
                    name="Company"
                    value={filters.Company}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por Empresa"
                    className="filter-input filter-empresa"
                />
                <input
                    type="date"
                    name="Date"
                    value={filters.Date}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por data"
                    className="filter-input filter-data"
                />
                <select
                    name="Year"
                    value={filters.Year}
                    onChange={handleFilterChange}
                    className="filter-input filter-year"
                >
                    <option value="">Ano</option>
                    <option value="2024">2024</option>
                    {/* Adicione mais opções de anos conforme necessário */}
                </select>
                <select
                    name="Month"
                    value={filters.Month}
                    onChange={handleFilterChange}
                    className="filter-input filter-month"
                >
                    <option value="">Mês</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
               <input
                    name="Responsible"
                    value={filters.Responsible}
                    onChange={handleFilterChange}
                    className="filter-input filter-responsible"
                    />
                <button onClick={clearFilters} className="filter-clear-button">Limpar Filtros</button>
            </div>
            <div className="actions-container">
                <button onClick={handleExportExcel} className="action-button export-button">Exportar para Excel</button>
                <button onClick={handleCreateTicket} className="action-button create-ticket-button">Criar Novo Ticket</button>
            </div>
            {isLoading ? (
                <p className="loading-message">Carregando...</p>
            ) : error ? (
                <p className="error-message">Erro: {error}</p>
            ) : (
                <table className="tickets-table">
                    <thead>
                        <tr>
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
                            <tr key={ticket.Id} onClick={() => handleRowClick(ticket.Id)} className="ticket-row">
                                <td>{new Date(ticket.Date).toLocaleDateString()}</td>
                                <td>{ticket.Time}</td>
                                <td>{ticket.Company}</td>
                                <td>{ticket.Problem}</td>
                                <td>{ticket.Resolution}</td>
                                <td>{ticket.Status}</td>
                                <td>{ticket.Responsible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TicketPage;
