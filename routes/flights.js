import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

/* GET users listing. */
router.get('/',flightsCtrl.index)

router.get('/new', flightsCtrl.new)

router.get('/:id', flightsCtrl.show)

router.post('/', flightsCtrl.create)

router.post('/:id/tickets', flightsCtrl.createTicket)

router.delete('/:id', flightsCtrl.delete)

router.get('/:id/edit', flightsCtrl.edit)

router.post('/:id/meals', flightsCtrl.addToMeal)

router.put('/:id',flightsCtrl.update)



export {
  router,
}
