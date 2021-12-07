module.exports = process.env.REACT_APP_ENV == 'local' ?
{

} : process.env.REACT_APP_ENV == 'dev' ?
{
    
} : 
{
    'apiDomain': 'https://pdmprodfunctions.azurewebsites.net/api',
    'awsconfig': {
        'userPoolId': 'ap-southeast-1_BLva1d942',
        'userPoolWebClientId': '3hpb0h9ii87u3kqbrk3panfsjv',
        'region': 'ap-southeast-1'
    }
}