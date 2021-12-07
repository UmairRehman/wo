import apiConfig from '../Enviroment/enviroment.js'
import ErrorHandling from './errorHandling.js';

const StoreToken = localStorage.getItem('token')


// Login API 
export async function SignupApi(obj) {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/signup`,
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',

      }),
      body: JSON.stringify({
        emailAddress: obj.emailAddress,
        password: obj.password,
        Cpassword: obj.Cpassword
      }),
    });

  return await ErrorHandling(result)

};


// varify phone 
export async function AddPhone(obj) {
  // console.log(StoreToken)

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))

  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/add/phonenumber`,
    {
      method: 'Put',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};






// varify phone 
export async function VarifyPhoneOTP(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/verify/otp`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)


};


// Resend OTP  
export async function ResendOTP(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/resend/otp`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)


};




// userName  
export async function UserNameAPI(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/check/username`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};




// submit SigUP  
export async function SubmitSignup(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/complete/signup`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};








