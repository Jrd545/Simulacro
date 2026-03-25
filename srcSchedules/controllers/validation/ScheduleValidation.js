import { check } from 'express-validator'

const validateTimeFormat = (value) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/ // HH:mm:ss
  if (!timeRegex.test(value)) {
    throw new Error('Time must be in HH:mm:ss format')
  }
  return true
}

const validateEndTimeAfterStartTime = (endTime, { req }) => {
  const startTime = req.body.startTime
  if (!startTime || !endTime) return true // Si falta alguno, no validamos (lo hará exists)
  if (endTime <= startTime) {
    throw new Error('End time must be after start time')
  }
  return true
}

const create = [
  check('startTime').exists().custom(validateTimeFormat),
  check('endTime').exists().custom(validateTimeFormat).custom(validateEndTimeAfterStartTime)
]

const update = [
  check('startTime').exists().custom(validateTimeFormat),
  check('endTime').exists().custom(validateTimeFormat).custom(validateEndTimeAfterStartTime)
]

export { create, update }
