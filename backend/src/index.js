import express from "express";
import connection from "./models/connection.js";
import bookRoute from "./routes/bookRoute.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Backend is working");
})

app.use("/book", bookRoute);


app.listen(process.env.PORT || 8000, async () => {
    console.log("Server started");

    try {
        await connection.authenticate();
        connection.sync();
        console.log("Connected to database.");
    } catch (error) {
        console.log("Error during connecting to database!!\n", error);
    }
});