import React, {useState} from 'react';
import {useChatContext} from "stream-chat-react";
import {UserList} from "./";
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

export function CreateChannel({createType, setIsCreating}) {
    const {client, setActiveChannel}  = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
    const [actualName, setActualName] = useState(client.user.name ||  "");
    const [channelName, setChannelName] = useState("");
    const createChannel = async (e) => {
        e.preventDefault();

        try{
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members:selectedUsers
            });

            await newChannel.watch();
            setChannelName("");
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActualName(client.user.name);
            setActiveChannel(newChannel);
        }catch (e){
            console.log(e);
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === "team" ? "Create a New Channel" : "Send a Direct Message"}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            {createType === "team" && <ChannelNameInput  channelName={channelName} setChannelName={setChannelName} /> }
            <UserList setSelectedUsers={setSelectedUsers} setActualName={setActualName}/>

            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType === "team" ? "Create Channel" : "Create Group Message"}</p>
            </div>
        </div>
    );
}
