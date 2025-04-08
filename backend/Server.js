const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const proposalRoutes = require('./routes/proposalRoutes');
const { protect } = require('./middleware/authMiddleware');
const serviceRoutes = require('./routes/serviceRoutes');
const investmentRoutes = require('./routes/investments');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/auth', userRoutes);
console.log("✅ Auth routes registered");
app.use('/api/services', serviceRoutes);
app.use('/api/investments', investmentRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log("A user connected");

  socket.on('joinProposal', ({ proposalId }) => {
    socket.join(proposalId);
  });

  socket.on('sendMessage', ({ proposalId, message }) => {
    io.to(proposalId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => console.log("User disconnected"));
});

const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const socketIo = require('socket.io');
// // const redisClient = require('./utils/redisClient');  // Import Redis client from utils
// const userRoutes = require('./routes/userRoutes');
// const proposalRoutes = require('./routes/proposalRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');

// dotenv.config();

// const app = express();
// const server = require('http').Server(app);
// const io = socketIo(server);

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/api', paymentRoutes);

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('MongoDB connection error:', err);
// });

// // API Routes
// app.use('/api', userRoutes);    // User-related routes (auth, registration, etc.)
// app.use('/api', proposalRoutes); // Proposal-related routes (create, update, list)

// // Socket.io setup for real-time communication
// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// // Server
// const PORT = process.env.PORT || 5005;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
