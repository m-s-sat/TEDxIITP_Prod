const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getTicketsBySessionType,
  createTicket,
} = require("../controllers/tickets");

router.get("/", getAllTickets);

router.get("/session_type/:id", getTicketsBySessionType);

router.post("/", createTicket);
module.exports = router;
