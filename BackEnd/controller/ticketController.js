const { executeQuery } = require('../db');
const sql = require('mssql');

async function getTickets() {
    const query = 'SELECT * FROM Ticket';
    try {
      const result = await executeQuery(query);
      return result; 
    } catch (error) {
      console.error('Failed to retrieve tickets', error);
      throw error;
    }
  }

  async function addTicket(ticketData) {
    const query = `
      INSERT INTO Ticket (Date, Time, Company, Problem, Resolution, Status, Responsable)
      VALUES (@Date, @Time, @Company, @Problem, @Resolution, @Status, @Responsable)
    `;
    try {
        await executeQuery(query, {
            Date: { value: ticketData.Date, type: sql.Date },
            Time: { value: ticketData.Time, type: sql.NVarChar(500) },
            Company: { value: ticketData.Company, type: sql.VarChar(50) },
            Problem: { value: ticketData.Problem, type: sql.NVarChar(500) },
            Resolution: { value: ticketData.Resolution, type: sql.NVarChar(500) },
            Status: { value: ticketData.Status, type: sql.NVarChar(100) },
            Responsable: { value: ticketData.Responsable, type: sql.VarChar(50) }
          });
    } catch (error) {
      console.error('Failed to add ticket', error);
      throw error;
    }
  }

  async function getTicketById(id) {
    const query = 'SELECT * FROM Ticket WHERE Id = @Id';
    try {
      const result = await executeQuery(query, { Id: { value: id, type: sql.Int } });
      if (result.length > 0) {
        return result[0];
      } else {
        return null; // Nenhum ticket encontrado
      }
    } catch (error) {
      console.error('Failed to retrieve ticket', error);
      throw error;
    }
  }

  async function updateTicket(id, ticketData) {
    const query = `
      UPDATE Ticket
      SET Date = @Date, Time = @Time, Company = @Company, Problem = @Problem,
          Resolution = @Resolution, Status = @Status, Responsable = @Responsable
      WHERE Id = @Id
    `;
    try {
      await executeQuery(query, {
        Id: { value: id, type: sql.Int },
        Date: { value: ticketData.Date, type: sql.Date },
        Time: { value: ticketData.Time, type: sql.NVarChar(500) },
        Company: { value: ticketData.Company, type: sql.VarChar(50) },
        Problem: { value: ticketData.Problem, type: sql.NVarChar(500) },
        Resolution: { value: ticketData.Resolution, type: sql.NVarChar(500) },
        Status: { value: ticketData.Status, type: sql.NVarChar(100) },
        Responsable: { value: ticketData.Responsable, type: sql.VarChar(50) }
      });
    } catch (error) {
      console.error('Failed to update ticket', error);
      throw error;
    }
  }

  async function deleteTicket(id) {
    const query = 'DELETE FROM Ticket WHERE Id = @Id';
    try {
      await executeQuery(query, { Id: { value: id, type: sql.Int } });
    } catch (error) {
      console.error('Failed to delete ticket', error);
      throw error;
    }
  }
  
  module.exports = {
    getTickets,
    addTicket,
    getTicketById,
    updateTicket,
    deleteTicket
};
  
  
  