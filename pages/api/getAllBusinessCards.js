const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

export default (req, res) => {

    const numToReturn = 31;

    let numToskip = 0;
    if (req.query.skip && typeof JSON.parse(req.query.skip) === "number"){
        numToskip = JSON.parse(req.query.skip);
    }

    console.log("SKIPPING: ", numToskip, req.query);
    
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

        db.collection("people").find({ userDeleted: { $ne: true }, userDisabled: { $ne: true } }).skip(numToskip).limit(numToReturn).toArray(function(err, result) {
            if (err){
                res.status(400).json({
                    message: err
                });
            }
            if (result){
                res.status(200).json({
                    hasMore: result.length == numToReturn,
                    cards: result.splice(0, numToReturn - 1)
                });
            }
            else {
                res.status(404).json({
                    message: "No Business Cards found!"
                });
            }
        });

        client.close();
    });

};