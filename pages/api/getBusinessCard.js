const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

export default (req, res) => {

    console.log("REQUEST: ", req);
    
    // Connection URL
    const url = `mongodb+srv://business_cards_nextjs:${encodeURI("Canada1!")}@da-business-cards-1on15.azure.mongodb.net/test?retryWrites=true&w=majority`;
    
    // Database Name
    const dbName = 'business_cards';
    
    // Create a new MongoClient
    const client = new MongoClient(url, {useUnifiedTopology: true});
    
    // Use connect method to connect to the Server
    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        db.collection("people").findOne({"slackID": req.body.id}, function(err, result) {
            if (err){
                res.status(400).json({
                    message: err
                });
            }
            if (result){
                res.status(200).json(result);
            }
            else {
                res.status(404).json({
                    message: "Business Card not found!"
                });
            }
          });

        client.close();
    });

};