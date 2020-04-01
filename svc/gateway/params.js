const Joi = require('@hapi/joi');
exports.params = Joi.object({
  trigger: Joi.string().valid(
    'create', 
    'left', 
    'left_center', 
    'center',
    'right',
    'right_center',
    'pro_science',
    'conspiracy',
    'fake_news',
    'satire',
  )
})