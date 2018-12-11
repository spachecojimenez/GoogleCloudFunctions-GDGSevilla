let DataStore = require("@google-cloud/datastore");
const { Translate } = require('@google-cloud/translate');

exports.getComments = async (req, res) => {
    let lang = req.query.lang || 'en';
    let getAll = req.query.getAll || false;

    let projectId = "gdg-functions";

    var datastore = new DataStore({
        projectId: projectId,
    });
    

    const query = datastore.createQuery("Comments");


    if (getAll === false) {
        query.filter('language', lang);
    }

    datastore.runQuery(query, async (err, entities) => {
        var messages = entities.map(function(val, index) {
            return val.comment;
        });

        console.log(messages);

        var t = new Translate();

        let result = await t.translate(messages, lang);

        console.log("Transaltion function executed");
        console.log(result);

        if (Array.isArray(result) ) {
            let response = {
                comments: result[0]
            };
            console.log("Response object");
            console.log(response);

            res.json(response);
        }
        console.log(result);

        if (messages !== undefined) {
            res.send(messages);
        }
        res.status(500).send();
    });
    
}