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
      body: JSON.stringify({
        emailAddress : obj.emailAddress,
        password : obj.password,
        firebaseToken: localStorage.getItem('firebaseToken') 
      }),
    });

  return await ErrorHandling(result)

};


// create profile   
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



// Edit Profile   
export async function editProfile(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/profile`,
    {
      method: 'PUT',
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



// get profile   
export async function GetProfile() {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/profile`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};




// change Prfile Picture   
export async function ChangeProfileImage(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/profile/pic`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};










// get followers   
export async function GetFollowers() {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/follow/follower`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};


// get following   
export async function GetFollowing() {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/follow/following`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};



// get Profie By iD   
export async function GetProfileByID(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))

  console.log(obj)


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/profile/${obj.id}`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};



// userActions  
export async function userActions(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))

  console.log(obj)


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/profile/follow/status`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};


// userName  
export async function SearchApi(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/search`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};




// Follow Request  
export async function FollowReqest(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/follow`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};



// I'm On  
export async function IMON() {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/profile/status`,
    {
      method: 'PUT',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};





// check Follow
export async function checkFollow(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/follow/check`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};


// get Profie By iD   
export async function GetSuggestion() {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))



  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/suggestion`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};



// add favourite  
export async function Favourite(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/favorite`,
    {
      method: 'PUT',
      headers,
      body:JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};


// unFollow  
export async function unFollow(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/follow`,
    {
      method: 'DELETE',
      headers,
      body:JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};


// add favourite  
export async function StatusChange(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))


  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/follow/status`,
    {
      method: 'PUT',
      headers,
      body:JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};


// get notification 
export async function GetNotification(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))



  let result = await fetch(`${apiConfig.base}${apiConfig.port}${apiConfig.route}/users/notification?${obj.offset}`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};





