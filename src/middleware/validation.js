
const options = {
    basic: {
        abortEarly: false,
        convert: true,
    },
    array: {
        abortEarly: false,
        convert: true,
    }, 
};

const Validation = (schema) => (req, res, next) => {
    Object.keys(schema).forEach((key) => {
        const { error } = schema[key].validate(req[key], options);
        if (error) {
            console.log(error);
            const message = error.details[0].message || 'Invalid Inputs';
            throw new BadRequestException(message);
        }
    });
    next();
};

export default Validation;