const Joi = require('@hapi/joi');
module.exports = {validateReq}

function validateReq (req) {
  let valid = true
  const paramsError = paramsSchema.validate(req.params).error;
  const bodyError = bodySchema.validate(req.body).error;

  if (paramsError) {
    valid = false
    console.log({paramsError})
  }
  if (bodyError) {
    valid = false
    console.log({bodyError})
  }
  return valid
}

const paramsSchema = Joi.object({
  // type: Joi.string().valid('publishers', 'slugs', 'curators', 'photos')
})

const bodySchema = Joi.object({
  // type: Joi.string().valid('publishers', 'slugs', 'curators', 'photos')
})