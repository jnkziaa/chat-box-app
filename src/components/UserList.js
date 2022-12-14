import React, {useEffect, useState} from 'react';
import {Avatar, useChatContext } from "stream-chat-react";
import {InviteIcon} from "../assets";
import {cleanup} from "@testing-library/react";
import {calculateNewValue} from "@testing-library/user-event/dist/utils";

const ListContainer = ({children}) => {
    return(
        <div className="user-list__container">
            <div className="user-list__header">
                <p> User </p>
                <p> Invite </p>

            </div>
            {children}
        </div>
    )
}

const UserItem = ({user, setSelectedUsers, setActualName}) =>{
    const [selected, setSelected] = useState(false);
    const handleSelect = () => {
        if(selected){
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUsers) => prevUsers !== user.id));  //keep selected users, removing the ones we clicked right now
            setActualName((prevUsers) => prevUsers.filter((prevUsers) => prevUsers !== user.fullName));
        }else{
            setSelectedUsers((prevUsers) => [... prevUsers, user.id]);
            setActualName((prevUsers) => [... prevUsers, user.fullName]);
        }
        setSelected((prevSelected) => !prevSelected)
    }
    return(
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id } size={32}/>
               <p className="user-item__name"> {user.fullName || user.id} </p>
            </div>
            {selected ? <InviteIcon /> : <div className="user-item__invite-empty" /> }
        </div>
    )
}

export function UserList({setSelectedUsers, setActualName}) {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() =>{
        const getUsers = async () => {
            if(loading) return;

            setLoading(true)
            try{
                const response = await client.queryUsers(
                    {id: {$ne: client.userID} },
                    {id: 1},
                    {limit : 8}
                );

                if(response.users.length){
                    setUsers(response.users)
                }
                else {
                    setListEmpty(true);
                }
            }catch (e) {
                setError(true);
            }

            setLoading(false);
        }
        if(client) getUsers().then(r => {})
    }, []);

    if(error){
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error Loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if(listEmpty){
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users...
            </div> : (
                users?.map((user, i) =>(
                    <UserItem index={i} key={user.id} user={user}  setSelectedUsers={setSelectedUsers} setActualName={setActualName} />
                ))
            )}

        </ListContainer>
    );
}
