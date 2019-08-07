let express = require('express');
let router = express.Router();
let _ = require('lodash');


let mesh = {
    nodes: [],
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', mesh);
});

router.post('/', function (req, res, next) {
    let node = JSON.parse(req.body.data);

    let nodeFiltered = mesh.nodes.filter((element) => {
        return element.address === node.address;
    });
    if (nodeFiltered.length > 0) {
        mesh.nodes[mesh.nodes.indexOf(nodeFiltered[0])] = node;
    } else {
        mesh.nodes.push(node);
    }


    setTimeout(() => {
        _.remove(mesh.nodes, function (n) {
            return n === node;
        });
    }, 10000)

    res.sendStatus(200);
});

router.post('/connect', function (req, res, next) {
    console.log(req.body);
    res.sendStatus(200)
});

router.post('/disconnect', function (req, res, next) {
    console.log(req.body);
    res.send('server ok');
});

module.exports = router;
