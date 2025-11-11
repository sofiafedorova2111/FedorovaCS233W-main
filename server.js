
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const logger = require('./middleware/logger');
const sanitizeHTML = require('sanitize-html');
const sanitizePar = require('./middleware/sanitize');
const listOfItems = require('./data');


const AppName = 'WeBuy';
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(logger);

app.use('/lists', require('./routes/lists'));

app.get('/', (req, res) => {
  const dateNow = new Date();
  res.render('index', { title: 'WeBuy Home', dateNow });
});

app.get('/about', (req, res) => {
  res.send(`
    <h1>${AppName}</h1>
    <h1>Sofia Fedorova</h1>
    <h1>Fall Term 2025</h1>
  `);
});

app.get('/user/:name', sanitizePar, (req, res) => {
  res.send(`<h2>Hello, ${req.params.name}</h2>`);
});

app.get('/list', (req, res) => {
  res.render('list', {
    listItems: listOfItems,
    title: 'Shopping List'
  });
});

app.get('/item/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = listOfItems.find(i => i.id === itemId);

  if (!item) {
    return res.status(404).render('error', {
      title: 'Error',
      message: 'Item not found'
    });
  }

  res.render('item', {
    item,
    title: `Item ${item.id}`
  });
});

app.get('/addItem', (req,res) => {
    res.render('addItem', {title: "Add New Item"});
});

app.post("/addItem", (request, response) => {
    let myItemName = request.body.txtItem?.trim();
    let mySection = request.body.selSection;
    let myPrice = parseFloat(request.body.numPrice);
    let myCoupon = !!request.body.chkCoupon;
  
    let errorArray = [];
  
    if (!myItemName) errorArray.push({ msg: "Item name is required." });
    if (!["drinks","produce", "dairy", "bakery"].includes(mySection)) errorArray.push({ msg: "Invalid section." });
    if (!(myPrice >= 0)) errorArray.push({ msg: "Price must be a number." });
  
    if (errorArray.length) {
      return response.status(400).render("errors", {
        errorArray,
        urlPath: "/addItem"
      });
    }
  
    let newItem = {
      id: listOfItems.length + 1,
      itemName: myItemName,
      section: mySection,
      price: myPrice,
      coupon: myCoupon
    };
  
    listOfItems.push(newItem);
    response.redirect("/list");
  });
  
app.get('/deleteItem', (req, res) => {
    res.render('deleteItem', {
      listItems: listOfItems,
      title: 'Delete Item'
    });
  });
  
  app.post("/deleteItem", (request, response) => {
    let selectedId = request.body.itemId;
    let itemId = parseInt(selectedId);
    let index = listOfItems.findIndex(item => item.id === itemId);
    let errorArray = [];
  
    if (!selectedId) errorArray.push({ msg: "You must select an item to delete." });
    if (selectedId && index === -1) errorArray.push({ msg: "Selected item does not exist." });
  
    if (errorArray.length) {
      return response.status(400).render("errors", {
        errorArray,
        urlPath: "/deleteItem"
      });
    }
  
    listOfItems.splice(index, 1);
    response.redirect("/list");
  });
  
app.use((theError, req, res, next) => {
  console.error("[ERROR] " + theError.message);
  const theStatus = theError.status || 500;
  res.status(theStatus).json({
    issue: "So sorry, we detected the following error: " + theError.message
  });
});

app.listen(PORT, () => {
  console.log(`Web server currently listening on port ${PORT}`);
});
