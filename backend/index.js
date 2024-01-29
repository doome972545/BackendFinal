const express = require("express");
const app = express();
const port = 5000;
const connection = require("./config/db")
const dotenv = require("dotenv").config();
const cors = require("cors")
const userRoute = require("./routes/User.routes")
const telemedRoute = require("./routes/Telemed.routes")
const authRoute = require("./routes/Auth.routes")
const adminRoute = require("./routes/Admin.routes")
const sleepRoute = require("./routes/SleepTime.routes")
const uploadRoute = require("./routes/UploadPost.routes")
const addedRoute = require("./routes/AddedPatient.routes")
const chartRoute = require("./routes/Chart.routes")
const CalendarRoute = require("./routes/Calendar.routes")

app.use(cors())
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/telemed', telemedRoute);
app.use('/api/auth', authRoute);
app.use('/api/sleep', sleepRoute);
app.use('/api/admin', adminRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/added', addedRoute);
app.use('/api/chart', chartRoute);
app.use('/api/calendar', CalendarRoute);



app.listen(port, () => console.log(`Example app listening http://localhost:${port}`));
