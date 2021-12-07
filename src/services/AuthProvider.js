import Amplify, { Auth } from 'aws-amplify';
import { awsconfig } from '../config'
Amplify.configure({
    Auth: awsconfig
});
let AuthService = () => {
    return {
        login: async (email, password) => {
            try {
                let user = await Auth.signIn(email, password);
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED')
                    user = await Auth.completeNewPassword(user, password)
                return user
            } catch (error) {
                console.log('error signing in', error);
                return { error }
            }
        },
        getToken: async () => {
            try {
                let user = await Auth.currentAuthenticatedUser()
                if (!user)
                    return false
                let session = await Auth.currentSession()
                let accessToken = session.getIdToken()
                return {
                    payload: accessToken.payload,
                    token: accessToken.getJwtToken()
                }
            }
            catch (err) {
                console.error(err);
                return false
            }
        },
        logout: async () => {
            try {
                await Auth.signOut();
                return true
            } catch (error) {
                console.log('error signing out: ', error);
                return { error }
            }
        }
    }
}

let service = AuthService()
export default service;