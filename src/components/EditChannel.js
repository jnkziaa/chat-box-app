import React, {useState} from 'react';
import {useChatContext} from "stream-chat-react";
import {UserList} from "./UserList";
import {CloseCreateChannel} from "../assets";

const ChannelNameInput = ({channelName = "", setChannelName}) => {


    const handleChange = (event) => {

        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input type="text" value={channelName} onChange={handleChange} placeholder="channel-name"/>
            <p> Add Members </p>
        </div>
    )
}

export function EditChannel({setIsEditing}) {
    const {channel} = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [actualName, setActualName] = useState([]);


    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChange = channelName !== (channel.data.name || channel.data.id);

        if(nameChange){
            await channel.update({name: channelName}, {text: `Channel name changed to ${channelName}`});
        }




        if(setSelectedUsers.length){

            await channel.addMembers(selectedUsers);
            //console.log(selectedUsers.data.name);
            await channel.sendMessage({text: `${actualName} has joined the crew`});
        }
        //console.log(selectedUsers.data.name)
        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
        //setActualName(null);
    }
    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p> Edit Channel </p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} setActualName={setActualName} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p> Save Changes </p>
            </div>
        </div>
    );
}
