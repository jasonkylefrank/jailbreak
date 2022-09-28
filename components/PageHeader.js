import { signOut } from "firebase/auth";
import { auth  } from "../lib/firebase";
import styled from "styled-components";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from './avatar';
import LogInButton from "./logInButton";
import { useContext, useState } from "react";
import { UserAuthContext } from "../lib/context";

const Header = styled.header`
    padding: 12px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const H1 = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 24px;
`;

export default function PageHeader() {

    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

    const { userAuth } = useContext(UserAuthContext);
    const avatarSrc = userAuth?.photoURL;

    const handleAvatarClick = (e) => setPopoverAnchorEl(e.currentTarget);
    const handlePopoverClose = () => setPopoverAnchorEl(null);

    const isAvatarPopoverOpen = Boolean(popoverAnchorEl);

    return (
        <Header>
            <H1>Jailbreak</H1>

            <Avatar src={avatarSrc} onClick={handleAvatarClick} />

            <Menu
                open={isAvatarPopoverOpen}
                onClose={handlePopoverClose}
                anchorEl={popoverAnchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {
                    userAuth
                        ? <MenuItem onClick={() => signOut(auth)}>Log out</MenuItem>                        
                        : <LogInButton rootComponent={MenuItem} />
                }
            </Menu>
        </Header>
    );
}


