import 'dotenv/config'
import cookieParser from 'cookie-parser';
import express from 'express'
import db from'./db/models/index.js';
import userRoutes from './routes/userRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import venueRoutes from './routes/venueRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import startEventExpiryCron from './utils/cronJobs.js'
const sequelize =db.sequelize

const app = express();
const PORT = process.env.PORT ;
app.use(cookieParser())
app.use(express.json());

startEventExpiryCron();

app.use('/users',userRoutes)
app.use('/tickets',ticketRoutes)
app.use('/events',eventRoutes)
app.use('/venues',venueRoutes)


app.get('/',(req,res)=>{
    res.send("Hello from backend");
})


sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  });