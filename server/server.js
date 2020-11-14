require("./db-connection")();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const boatManager = require("./manager");

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(express.static(__dirname + "./../public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index.html"));

app.post("/boats/", async (req, res) => {
	try {
		const t = await boatManager.create({ ...req.body });
		return res.status(200).send(t);
	} catch (ex) {
		return res.status(500).send(ex.message);
	}
});
app.get("/boats/", async (req, res) => {
	try {
		const t = await boatManager.create({ ...req.body });
		return res.status(200).send(t);
	} catch (ex) {
		return res.status(500).send(ex.message);
	}
});
app.post("/boats/all", async (req, res) => {
	try {
		const t = await boatManager.list(req.body.keyword || "");
		return res.status(200).send(t);
	} catch (ex) {
		return res.status(500).send(ex.message);
	}
});

app.post("/boats/:id", async (req, res) => {
	try {
		const t = await boatManager.update(req.params.id, { ...req.body });
		return res.status(200).send(t);
	} catch (ex) {
		return res.status(500).send(ex.message);
	}
});

app.delete("/boats/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const r = await boatManager.delete(id);
		return res.status(200).send(r);
	} catch (ex) {
		return res.status(500).send(ex.message);
	}
});

app.get("/boats/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const r = await boatManager.getById(id);
		return res.status(200).send(r);
	} catch (ex) {
		return res.status(500).send(ex.message);
	}
});
// Get data från sökta keywords
app.get("/search", async (req, res) => {
	try {
		const word = req.query.word;
		const maxPrice = req.query.maxPrice;
		// anropar search från manager.js
		const r = await boatManager.search(word, maxPrice);
		return res.status(200).send(r);
	} catch (ex) {
		console.log(ex);
		return res.status(500).send(ex.message);
	}
});

app.post("/reset", async (req, res) => {
	try {
		await boatManager.cleanDb();
		await boatManager.import();
		return res.status(200).send(true);
	} catch (ex) {
		return res.status(500).send(ex.message);
	}
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API started @${port}`));
