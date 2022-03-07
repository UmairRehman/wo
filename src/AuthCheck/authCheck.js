import React, { FC, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";


// const AuthCheck: FC<React.ComponentProps<typeof Route>> = (props) => {
    const AuthCheck = (props) => {
        const [token, setToken] = useState();
        

    // const token = Promise.resolve().then(()=> localStorage.getItem('token'));
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);
    

        return (
           <Route path={props.path}> { token !== null ? props.children : <Redirect to='/login'/> }</Route>
        );
   
};

export default AuthCheck;