const express = require("express");
const cors = require("cors");

let customers = require("./data/customers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.post("/customers", (req, res) => {
  const newCustomer = {
    id: customers.length + 1,
    ...req.body,
  };

  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

app.put("/customers/:id", (req, res) => {

  const id = Number(req.params.id);

  const customer = customers.find(
    c => c.id === id
  );

  if (!customer) {
    return res
      .status(404)
      .json({ message: "Not found" });
  }

  customer.name = req.body.name;
  customer.risk = req.body.risk;
  customer.unpaidAmount =
    req.body.unpaidAmount;

  res.json(customer);

});

app.delete("/customers/:id", (req, res) => {

  const id = Number(req.params.id);

  customers = customers.filter(
    customer => customer.id !== id
  );

  res.json({
    message: "Customer deleted"
  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

