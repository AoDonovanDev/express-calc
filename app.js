const express = require('express');
const ExpressError = require("./expressError")

const app = express();

// To parse http request body on each request:
app.use(express.json()); //For JSON
app.use(express.urlencoded({ extended: true })); //For Form Data

app.get('/', (req, res) => {
  res.send("HOMEPAGE!")
})


app.get('/mean/:nums', (req, res, next) => {
    let input = req.params.nums.split(',')
    try{
      let nums = input.map(x => parseInt(x))
      let sum = 0;
      for(let num of nums){
          sum += num
      }
      let mean = sum/nums.length
      if(!mean) throw new ExpressError("those arent numbers", 500)
    } catch (e) {
      next(e)
    }
    res.json({ 
      response: {
      operation: 'mean',
      value: mean
      }
    })
})


app.get('/median/:nums', (req, res) => {
  let input = req.params.nums.split(',')
  let nums = input.map(x => parseInt(x))
  let medianIdx = Math.floor((nums.length-1)/2)
  res.json({ 
    response: {
    operation: 'median',
    value: nums[medianIdx]
    }
  })
})


app.get('/mode/:nums', (req, res) => {
  let input = req.params.nums.split(',')
  let nums = input.map(x => parseInt(x))
  
  const mode = {};
  let max = 0;
  let pick = 0;

  function findMode(nums){
    for(let i = 0; i < nums.length; i++) {
      const item = nums[i];
      if(mode[item]){
        mode[item]++
      } else {
        mode[item] = 1;
      }
      console.log(mode, mode[item], item, max)
      if(mode[item] > max){
        max = mode[item]
        pick = item;
      }
      };
      return pick
  }

  const result = findMode(nums)

  res.json({ 
    response: {
    operation: 'mode',
    value: result
    }
  })
})


// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});

// generic error handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});



app.listen(3000, () => {
    console.log("Server running on port 3000")
  });