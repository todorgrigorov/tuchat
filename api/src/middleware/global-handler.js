export default (req, res) => {
    res.send(
        `<body style="background-color:#0081BA;"><h1 style="padding: 10px;font-size:25px;color: white;font-family: sans-serif">tuchat Web API ${process.env.npm_package_version}</h1></body>`
    );
};