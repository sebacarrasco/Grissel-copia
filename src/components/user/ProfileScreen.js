import React, {useState, useEffect } from 'react';
import useMediaQuery from '../../useMediaQuery';
import API from '../../api';
import ProfileScreenMobile from  './ProfileScreenMobile'
import { ProfileScreenWeb } from './ProfileScreenWeb'
import { useSelector } from 'react-redux';

export default function ProfileScreen() {

    const web = useMediaQuery("(min-width: 600px)");
    // const [user, setUser]= useState("");

    // const id_user = 1; //Obtener id del user
 
    // const getUser = async () => {
    //    var user  = await API.get(`user/${id_user}`);
    //    setUser(user.data);
    // }; 

    // useEffect(() => {
    //     getUser()
    // }, [id_user]);

    const { currentUser, id } = useSelector(state => state.auth);

    
    return (
        <div>
        {web ? (<ProfileScreenWeb user={currentUser} id = {id}/>): (<ProfileScreenMobile user={currentUser} id = {id}/>)}
        </div>
    );
};