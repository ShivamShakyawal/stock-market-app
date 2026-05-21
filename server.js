require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 8080;

//  SERVING STATIC FILES                allowing browser to access files inside public folder
app.use(express.static("public"));

//  HOME ROUTE  
// app.get("/", (req, res) => {
//     res.send("Stock App Server Running");
// });

app.get("/stock/:symbol", async (req, res) => {

    try {

        const symbol = req.params.symbol;

        console.log("Searching:", symbol);

        const response = await axios.get(
            "https://www.alphavantage.co/query",
            {
                params: {
                    function: "GLOBAL_QUOTE",
                    symbol: symbol,
                    apikey: process.env.ALPHA_API_KEY
                }
            }
        );

        res.json(response.data);

    } catch(err) {

        console.error(err.message);

        res.status(500).json({
            message: "Failed to fetch stock data"
        });

    }

});

//  START SERVER
app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`);
});

