import React, { useEffect, useState } from 'react'
import {
    Link
} from "react-router-dom";
import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';




const oauth = {
    domain: 'wo.auth.us-east-2.amazoncognito.com',
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'https://app.whoson.co/social/',
    redirectSignOut: 'https://app.whoson.co/social/',
    responseType: 'token'
};

Auth.configure({
    region: "us-east-2",
    userPoolId: "us-east-2_aPujjAawB",
    userPoolWebClientId: "6u3bu80bhobl8rts163gc022m",
    oauth
});

Amplify.configure({
    aws_cognito_region: "us-east-2", // (required) - Region where Amazon Cognito project was created   
    aws_user_pools_id: "us-east-2_aPujjAawB", // (optional) -  Amazon Cognito User Pool ID   
    aws_user_pools_web_client_id: "6u3bu80bhobl8rts163gc022m", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
    aws_cognito_identity_pool_id: "us-east-2_aPujjAawB", // (optional) - Amazon Cognito Identity Pool ID   
    aws_mandatory_sign_in: "enable" // (optional) - Users are not allowed to get the aws credentials unless they are signed in   
})
function SocialSIgnIn() {

    const [loader, setLoader] = useState(false)

    const [user, setUser] = useState(null);

    const [customState, setCustomState] = useState(null);

    let history = useHistory();

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    setUser(data);
                    break;
                case "signOut":
                    setUser(null);
                    break;
                case "customOAuthState":
                    setCustomState(data);
            }
        });

        Auth.currentAuthenticatedUser()
            .then(currentUser => setUser(currentUser))
            .catch((err) => console.log(err));

        return unsubscribe;
    }, []);


    return (
        <div>

        </div>
    )
}

export default SocialSIgnIn
