import Ajv from "ajv";
import AjvErrors from "ajv-errors";

const ajv = new Ajv({
    allErrors: true
});

AjvErrors(ajv);

function validateSchema(schema, req){
    
    const validate = ajv.compile(schema)
    const valid = validate(req.body)
    
    if (!valid) {
        
        let errorsPool = []
        
        validate.errors.forEach(element => {
            if (element.instancePath) {
                var error = element.instancePath.replace("/","") + " " + element.message;
            } else {
                var error = element.message;
            }
            errorsPool.push(error);
        });
        
        let statusCode = 422;
        
        let response = {
            data : errorsPool,
            code : statusCode
        };

        return response;
    }
    
    return valid;
}

export default validateSchema;