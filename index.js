import express from "express";

const app = express();

const port = 8080;

app.use(express.json());

let teadata = [];
let nextid = 1;

app.get("/", (req, res) => {
  res.send("hello brother");
});

// app.get("/ayush", (req, res) => {
//   res.send("hello ayush ");
// });

// added data
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newtea = {
    id: nextid++,
    name,
    price,
  };
  teadata.push(newtea);
  res.status(200).send(newtea);
});

//show responses
app.get("/teas", (req, res) => {
  res.status(200).send(teadata);
});

// get a response with id
app.get("/teas/:id", (req, res) => {
  const tea = teadata.find((t) => t.id == parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("teas not found ");
  } else {
    res.status(200).send(tea);
  }
});

// updation of tea

app.put("/teas/:id", (req, res) => {
  const tea = teadata.find((t) => t.id == parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("teas not found ");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete tea

app.delete("/teas/:id", (req, res) => {
  const index = teadata.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teadata.splice(index, 1);
  return res.status(200).send("the tea is deleted");
});

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
