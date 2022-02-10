import React, { Fragment } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ForgetConfirmation from '../component/auth/forgetPassword/confirmation.js';
import ForgetPassword from '../component/auth/forgetPassword/forgetPassword.js';
import NewPassword from '../component/auth/forgetPassword/newPassword.js';
import PasswordVarified from '../component/auth/forgetPassword/passwordVarified.js';
import Login from '../component/auth/login/login.js';
import Introduction1 from '../component/introduction/introduction1';
import Introduction2 from '../component/introduction/introduction2';
import Introduction3 from '../component/introduction/introduction3';
import Introduction4 from '../component/introduction/introduction4';
import Sidebar from '../component/sidebar/sidebar.js';
import Splash from '../component/splash/splash';
import Header from '../component/header/header'
import Dashboard from '../pages/dashboard/dashboard.js';
import Select from '../pages/select/select';
import Intrest from '../pages/intrest/intrest.js';
import Selection from '../component/selection/selection.js';
import Notification from '../pages/notification/notification';
import FollowingCard from '../component/following/followingCard.js';
import Following from '../pages/following/following.js';
import Suggest from '../pages/suggest/suggest.js';
import Profile from '../pages/profile/profile.js';
import UserListing from '../pages/userListing/userListing.js';
import PhoneAndEmail from '../component/auth/signUp/phoneAndEmail.js';
import SignupConfirmation from '../component/auth/signUp/signupConfirmation.js';
import SignupConfirmationEmail from '../component/auth/signUp/signupConfirmationEmail.js';
import UserName from '../component/auth/signUp/username.js';
import EnterPassword from '../component/auth/signUp/enterPassword.js';
import DateOfBirth from '../component/auth/signUp/dateOfBirth.js';
import AddProfilePicture from '../component/auth/signUp/profilePicture.js';
import ProfilePictureView from '../component/auth/signUp/profilePictureView.js';
import SignupForm from '../component/auth/signUp/signupForm.js';
import MyProfile from '../pages/myProfile/myProfile.js';
import UploadProfile from '../component/uploadProfile.js/uploadProfile.js';
import Signup from '../component/auth/signUp/signup1.js';
import Complete from '../pages/complete/complete.js';
import Search from '../pages/search/search.js';
import EditProfile from '../component/auth/signUp/editProfile.js';
import ScrollDown from '../component/scroolDown/scroolDown.js';



function router() {
    return (
        <div>
            <Router>
                <Fragment>
                    <ScrollDown/>
                    <Switch>
                        <Route exact path='/dashboard'>
                            <Dashboard />
                        </Route>

                        <Route path='/splash'>
                            <Splash />
                        </Route>

                        <Route path='/login'>
                            <Login />
                        </Route>

                        <Route path='/forget-password'>
                            <ForgetPassword />
                        </Route>

                        {/* SignUp  */}

                        <Route path='/signup-0'>
                            <Signup />
                        </Route>

                        <Route path='/signup-1'>
                            <PhoneAndEmail />
                        </Route>

                        <Route path='/signup-confirmation'>
                            <SignupConfirmation />
                        </Route>

                        <Route path='/signup-confirmation-email'>
                            <SignupConfirmationEmail />
                        </Route>

                        <Route path='/username'>
                            <UserName />
                        </Route>

                        <Route path='/create-password'>
                            <EnterPassword />
                        </Route>

                        <Route path='/date-of-birth'>
                            <DateOfBirth />
                        </Route>

                        <Route path='/profile-picture'>
                            <AddProfilePicture />
                        </Route>

                        <Route path='/view-profile-picture'>
                            <ProfilePictureView />
                        </Route>

                        <Route path='/signup-form' >
                            <SignupForm />
                        </Route>

                        <Route path='/edit-profile' >
                            <EditProfile />
                        </Route>

                        {/* SignUP end  */}

                        <Route path='/'>
                            <Introduction1 />
                        </Route>

                        <Route path='/instruction-3'>
                            <Introduction2 />
                        </Route>

                        <Route path='/instruction-2'>
                            <Introduction3 />
                        </Route>

                        <Route path='/instruction-4'>
                            <Introduction4 />
                        </Route>

                        <Route path='/forget-confirmation'>
                            <ForgetConfirmation />
                        </Route>

                        <Route path='/create-new-password'>
                            <NewPassword />
                        </Route>

                        <Route path='/varified'>
                            <PasswordVarified />
                        </Route>

                        <Route path='/completed'>
                            <Complete />
                        </Route>

                        <Route path='/header'>
                            <Header />
                        </Route>

                        <Route path='/select'>
                            <Select />
                        </Route>

                        <Route path='/intrest'>
                            <Intrest />
                        </Route>

                        <Route path='/notification'>
                            <Notification />
                        </Route>

                        <Route path='/following'>
                            <Following />
                        </Route>

                        <Route path='/users'>
                            <UserListing />
                        </Route>

                        {/* This needs to be correct  */}
                        <Route path='/suggest'>
                            <Suggest />
                        </Route>

                        <Route path='/profile/:id' >
                            <Profile />
                        </Route>

                        <Route path='/profile-1'>
                            <MyProfile />
                        </Route>

                        <Route path='/search'>
                            <Search />
                        </Route>

                        {/* This needs to be correct from here */}

                        {/* import Component  */}

                        <Route path='/following-card'>
                            <FollowingCard />
                        </Route>

                        <Route path='/test'>
                            <UploadProfile />
                        </Route>

                        {/* import Component End  */}



                    </Switch>
                </Fragment>
            </Router>
        </div>
    )
}

export default router
