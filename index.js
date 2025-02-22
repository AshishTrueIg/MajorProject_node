require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT ;
require('./models/index')
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const eventRoutes = require('./routes/eventRoutes')
const venueRoutes = require('./routes/venueRoutes')

app.use(cookieParser())
app.use(express.json());

app.use('/users',userRoutes)
app.use('/tickets',ticketRoutes)
app.use('/events',eventRoutes)
app.use('/venues',venueRoutes)


app.get('/',(req,res)=>{
    res.send("Hello from backend");
})


app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`)
})