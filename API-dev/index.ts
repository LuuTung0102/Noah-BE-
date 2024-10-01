const express = require('express');
require('dotenv').config();
const app = express();
const userRoute = require('./src/Api/Routes/UserRoutes')
const roleRoute = require('./src/Api/Routes/RoleRoutes')
const schoolRoute = require('./src/Api/Routes/SchoolRoutes');
const majorRoute = require('./src/Api/Routes/MajorRoutes');
const subjectRoute = require('./src/Api/Routes/SubjectRoutes');
const questionRoute = require('./src/Api/Routes/QuestionRoutes');
const answerRoute = require('./src/Api/Routes/AnswerRoutes');
const fileRoute = require('./src/Api/Routes/FileRoutes');
const subscriptionRoute = require('./src/Api/Routes/SubscriptionRoutes');
const orderRoute = require('./src/Api/Routes/OrderRoutes');
const paymentRoute = require('./src/Api/Routes/PaymentRoutes');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
import { CleanupDownloads } from './src/Infrastructure/Scheduler/CleanupDownload';
const PORT = process.env.PORT;
app.use(express.json());    

app.use("/api", roleRoute);
app.use("/api", userRoute);
app.use("/api", schoolRoute);
app.use("/api", majorRoute);
app.use("/api", subjectRoute);
app.use("/api", questionRoute);
app.use("/api", answerRoute);
app.use("/api", fileRoute);
app.use("/api", subscriptionRoute);
app.use("/api", orderRoute)
app.use("/api", paymentRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/uploads', express.static('uploads'));
app.use('/downloads', express.static('downloads'));


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is runnit at port: ${PORT}`);
})

