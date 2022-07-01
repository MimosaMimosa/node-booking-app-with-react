import express from 'express'
import { destroy, index, store, update } from '../controller/hotel.js';

const route = express.Router();

route.post('/', store)
route.get('/', index)
route.put('/:id', update)
route.delete('/:id', destroy)

export default route;