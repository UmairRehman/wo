import apiConfig from '../Enviroment/enviroment.js'
import ErrorHandling from './errorHandling.js';

const StoreToken = localStorage.getItem('token')
const firebaseToken = localStorage.getItem('firebaseToken')
const provider = localStorage.getItem('provider')



// Check Token  
export async function CheckLogin(obj) {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/checkToken`,
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        'Authorization': obj.token,
        'provider': obj.provider,
        'firebaseToken': firebaseToken

      }),
      // body: JSON.stringify({
      //   emailAddress: obj.emailAddress,
      //   password: obj.password,
      //   Cpassword: obj.Cpassword
      // }),
    });

  return await ErrorHandling(result)

};


// Login API 
export async function SignupApi(obj) {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/signup`,
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

console.log(`${process.env.REACT_APP_API_PATH}/users/signup`)
  return await ErrorHandling(result)

};


// varify phone 
export async function AddPhone(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))

  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/add/phonenumber`,
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



  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/verify/otp`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/resend/otp`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/reset/resend/otp`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/check/username`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/complete/signup`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/reset/send/otp`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/reset/send/otp`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/reset/verify/otp`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/reset/change/password`,
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


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/login`,
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        'firebaseToken': firebaseToken
      }),
      body: JSON.stringify({
        emailAddress: obj.emailAddress,
        password: obj.password,
        firebaseToken: localStorage.getItem('firebaseToken')
      }),
    });
    console.log(`${process.env.REACT_APP_API_PATH}/users/login`)
  return await ErrorHandling(result)

};


// create profile   
export async function CreateProfile(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))

  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/create/profile`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });
    console.log(`${process.env.REACT_APP_API_PATH}/users/create/profile`)
  return await ErrorHandling(result)

};



// Edit Profile   
export async function editProfile(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/profile`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/profession`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};


// Read Notification API
export async function readAPI(id) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))

  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/notification/${id}`,
    {
      method: 'PUT',
      headers
    });

  return await ErrorHandling(result)
}

// get profile   
export async function GetProfile() {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/profile`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/profile/pic`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};










// get followers   
export async function GetFollowers(offset) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow/follower?offset=${offset}`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow/following`,
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
  headers.append('provider', localStorage.getItem('provider'))



  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/profile/${obj.id}`,
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
  headers.append('provider', localStorage.getItem('provider'))



  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/profile/follow/status`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/search?${obj.offset}`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/profile/status`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow/check`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/suggestion`,
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
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/favorite`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};


// unFollow  
export async function unFollow(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow`,
    {
      method: 'DELETE',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};


// add favourite  
export async function StatusChange(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow/status`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)
};


// get notification 
export async function GetNotification(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/notification?offset=${obj.offset}`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};


export async function GetPending(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow/request?offset=${obj.offset}`,
    {
      method: 'GET',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};


// delete notification 
export async function DeleteNotificationApi(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))



  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/notification/${obj.id}`,
    {
      method: 'DELETE',
      headers,
      // body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};


// mute notification 
export async function MuteNOtification(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))



  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow/notification`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};

// logout
export async function Logout(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))


  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/logout`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};

// check block status 

export async function checkBlockStatus(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))



  let result = await fetch(`${process.env.REACT_APP_API_PATH}/follow/checkFollower`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    });

  return await ErrorHandling(result)

};


// check block status 

export async function DeleteUser(obj) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', localStorage.getItem('token'))
  headers.append('provider', localStorage.getItem('provider'))



  let result = await fetch(`${process.env.REACT_APP_API_PATH}/users/`,
    {
      method: 'DELETE',
      headers,
    });

  return await ErrorHandling(result)

};


