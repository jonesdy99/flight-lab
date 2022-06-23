import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'



// function newFlight(req,res){
//   res.render('flights/new', {
//     title: 'Add Flight'
//   })
// }
function newFlight(req,res){
  const newPlane = new Flight()
  const dateTime = newPlane.departs
  const departsDate = dateTime.toISOString().slice(0,16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate
  })
}


function create(req,res){
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function index(req,res){
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights:flights,
      title: 'All Flights',
    })
  })
}

function show(req,res){
  Flight.findById(req.params.id)
  .populate('meals')              
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
    res.render('flights/show',{
      title: 'Flight Detail',
      flight: flight,
      meals: meals,
    })
  })
})
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req,res){
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req,res){
  Flight.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createTicket(req,res){
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(()=> {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToMeal(req,res){
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export{
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMeal
}