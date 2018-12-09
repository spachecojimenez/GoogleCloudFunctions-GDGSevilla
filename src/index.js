exports.helloGET = (req, res) => {
    let to = req["name"] || "World";
    res.send(`Hello ${ to }!`);
};