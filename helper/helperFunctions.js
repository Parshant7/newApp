const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const numerics = '0123456789';

module.exports.generateKey = () => {
    let length = 10;
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


module.exports.generateOrderId = () => {
    let length = 12;
    let result = '';
    const numericsLength = numerics.length;
    for ( let i = 0; i < length; i++ ) {
        result += numerics.charAt(Math.floor(Math.random() * numericsLength));
    }

    return result;
}

module.exports.handleErrors = (err) => {
    let errors = { fname: '', dob: '', gender: '', mobile: '', email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('librarian validation failed') || err.message.includes('Validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        errors[properties.path] = properties.message;
      });
    }
    console.log(errors);
    return errors;
  }
  