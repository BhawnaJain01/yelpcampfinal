const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const PORT = process.env.PORT || 3211 

const cors = require("cors")

dotenv.config();

mongoose.connect(process.env.DB_CONNECT , {})
.then(() => console.log("Database Connected !! "))
.catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended : false}));

app.use("/uploads" , express.static("./ImgUploads"))

const Routes = require("./Routes/ApiRoutes")
app.use("/" , Routes);

app.listen(PORT , () => {
    console.log("Server started and running at port 3211");
});