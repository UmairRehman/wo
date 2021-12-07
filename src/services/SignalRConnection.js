import AuthProvider from './AuthProvider'
const { getToken } = AuthProvider
const { apiDomain } = require('../config')
let connection = null;
let connected = false;
const signalR = require("@microsoft/signalr");
let getConnection = async () => {
    let { token, payload } = await getToken()
    if (token) {
        if (!connection)
            connection = new signalR.HubConnectionBuilder()
                .withUrl(`${apiDomain}?userId=${payload.email}&token=${token}`)
                .configureLogging(signalR.LogLevel.Information)
                .build();
        try {
            if (connected)
                throw new Error('Client already connected...')
            await connection.start()
            connected = true
            console.log('Connected to realtime server...')
            connection.onclose(() => {
                connected = false
                console.log('Disconnected from realtime server...')
            });
        }
        catch (err) {
            console.log(err)
        }
    }
    return connection;
}
export default getConnection;