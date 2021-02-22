const bcrypt = require('bcrypt');

export const checkFields = (args) => {
    const errors = {};

    for (const key in args) {
        let isOk = checkEmptyField(args[key]);

        if (!isOk) {
            errors[key] = key[0].toUpperCase() + key.slice(1).toLowerCase() + ' field is empty !';
        }
    }

    return errors;
};

export const checkEmptyField = (value) => {
    if (value.trim() === '') {
        return false;
    }

    return true;
};

export const checkPasswords = (password, confirmPassword) => {
    let errors = {};

    let result = bcrypt.compareSync(confirmPassword, password);

    console.log(result);

    if (!result) {
        errors.password = 'Passwords does not match !';
    }

    return errors;
};

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = {};

    let isOk = re.test(email);

    if (!isOk) {
        errors.email = 'Please provide a valid email address !';
    }

    return errors;
};

export const checkErrors = (errors) => {
    if (Object.keys(errors).length > 0) {
        return false;
    }

    return true;
};
