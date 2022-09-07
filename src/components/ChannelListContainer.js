import React, {useState} from 'react';
import {ChannelList, useChat, useChatContext} from "stream-chat-react";
import Cookies from "universal-cookie/lib";
import {ChannelSearch, TeamChannelList, TeamChannelPreview} from "./";
import HospitalIcon from "../assets/hospital.png"
import LogoutIcon from "../assets/logout.png"

const cookies = new Cookies();



const SideBar = ( {logout} ) => {
    return(
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner">
                    <img src={HospitalIcon} alt="Hospital" width="30"/>
                </div>
            </div>
            <div className="channel-list__sidebar__icon1">
                <button className="icon1__inner" onClick={ logout }>
                    <img src={LogoutIcon} alt="Hospital" width="30"/>
                </button>
            </div>
        </div>
    );
}

const CompanyHeader = () => {
    return(
        <div className="channel-list__header">
            <p className="channel-list__header__text"> Anime Group Chat </p>
        </div>
    )
}



const customChannelTeamFilter = (channel) => {
    return channel.filter((channel) => channel.type === "team");
}

const customChannelMessagingFilter = (channel) => {
    return channel.filter((channel) => channel.type === "messaging");
}



const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
    const {client} = useChatContext();
    const logout = () => {
        cookies.remove("token");
        cookies.remove("useId");
        cookies.remove("username");
        cookies.remove("fullName");
        cookies.remove("avatarURL");
        cookies.remove("hashedPassword");
        cookies.remove("phoneNumber");

        window.location.reload();

    }

    const filters = {members : {$in : [client.userID]}}

    return (
        <>
            <SideBar logout={logout}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader/>
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter
                    }
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}


                        />
                    )
                    }
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                                {... previewProps}
                                setIsCreating={setIsCreating}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                                type="team"

                           />
                    )}

                />

                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter
                    }
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}


                        />
                    )
                    }
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {... previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}

                />

            </div>
        </>
    )
}

export function ChannelListContainer({setCreateType, setIsCreating, setIsEditing}){
    const [toggleContainer, setToggleContainer] = useState(false);

    return(
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating} />
            </div>
            <div className="channel-list__container-responsive" style={{
                backgroundColor:"#005fff",
                left: toggleContainer ? "0%" : "-89%"}}>
                <div className="channerl-list__container-toggle" onClick={() => setToggleContainer(((
                    prevToggleContainer) => !prevToggleContainer))}>
                </div>
                <ChannelListContent
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setToggleContainer={setToggleContainer} />
            </div>
        </>
    )
}
