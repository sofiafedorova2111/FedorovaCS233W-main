
const sanitizeHTML = require('sanitize-html');

const sanitize = (request, response, next) => {
    if (req.params) {
        Object.keys(req.params).forEach((key) => {
        req.params[key] = sanitizeHTML(req.params[key]);
        });
      }
    
      
      next();
    };
    
    module.exports = sanitize;