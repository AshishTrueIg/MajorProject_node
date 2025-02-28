// const Ajv = require('ajv');
// const addFormats = require('ajv-formats')

import Ajv from 'ajv'
import addFormats from 'ajv-formats'
const ajv = new Ajv({ allErrors: true, strict: false });

addFormats(ajv);

const validateSchema = (schema)=>{
    return(req,res,next)=>{
        const validate = ajv.compile(schema);
        const valid = validate(req.body);

        if(!valid)
        {
            return res.status(400).json({
                errors: validate.errors.map(err => ({
                    field: err.instancePath.replace('/', ''),
                    message: err.message
                }))
            });
        }

        next();
    }
}

export default validateSchema;