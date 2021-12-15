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


// Resend OTP  
export async function ForgetResendOTP(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/reset/resend/otp`,
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



// forget Phone
export async function ForgetPhone(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/reset/send/otp`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};


// forget Email
export async function ForgetEmail(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/reset/send/otp`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};



// forget varification
export async function ForgetVarification(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/reset/verify/otp`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};




// forget confirm password 
export async function ForgetConfirmPassword(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/reset/change/password`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};




// Login   
export async function Login(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/login`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};


// Login   
export async function CreateProfile(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/create/profile`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};






// get profession   
export async function GetProfession() {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/profession`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};








