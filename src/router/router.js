import React from 'react'
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


function router() {
    return (
        <div>
            <Router>
                <Switch>
                    
                    <Route exact path='/dashboard'>
                        <Dashboard  />
                    </Route>

                    <Route exact path='/'>
                        <Splash  />
                    </Route>

                    <Route path='/login'>
                        <Login  />
                    </Route>

                    <Route path='/forget-password'>
                        <ForgetPassword  />
                    </Route>

                    <Route exact path='/'>
                        <Splash  />
                    </Route>

                    <Route path='/instruction-1'>
                        <Introduction1 />
                    </Route>

                    <Route path='/instruction-2'>
                        <Introduction2 />
                    </Route>

                    <Route path='/instruction-3'>
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

                    <Route path='/sidebar'>
                        <Sidebar />
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







                    {/* import Component  */}
                    
                    <Route path='/following-card'>
                        <FollowingCard />
                    </Route>




                </Switch>
            </Router>
        </div>
    )
}

export default router
