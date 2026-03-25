import { check } from 'express-validator'

const create = [
  check('alias').exists().isString().trim(),
  check('street').exists().isString().trim(),
  check('city').exists().isString().trim(),
  check('zipCode').exists().isString().trim(),
  check('province').exists().isString().trim(),
  check('isDefault').optional().isBoolean()

]

const update = [
  check('alias').exists().isString().trim(),
  check('street').exists().isString().trim(),
  check('city').exists().isString().trim(),
  check('zipCode').exists().isString().trim(),
  check('province').exists().isString().trim(),
  check('isDefault').exists().isBoolean()
]

export { create, update }
