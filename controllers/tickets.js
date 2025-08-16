const Ticket = require("../models/tickets");

async function getAllTickets(req, res) {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTicketsBySessionType(req, res) {
  const { id } = req.params;
  try {
    const tickets = await Ticket.find({ session_type: id });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createTicket(req, res) {
  const {
    name,
    image,
    offerPrice,
    originalPrice,
    description,
    price_till,
    session_type,
    paymentLink,
  } = req.body;
  try {
    const ticket = await Ticket.create({
      name,
      image,
      offerPrice,
      originalPrice,
      description,
      price_till,
      session_type,
      paymentLink,
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllTickets, getTicketsBySessionType, createTicket };
