const { check } = require('express-validator/check');

const validator_add = [
    check('title').custom((value) => {
        if (value === '') throw new Error('you need a title');
        return true;
    }),
    check('content').custom((value) => {
         if (value === '') { throw new Error('you need write something') } else {
             return true;
         }
    })
]

module.exports = validator_add;