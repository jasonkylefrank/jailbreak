import styled from "styled-components";
import Avatar from './Avatar';
import { useContext } from "react";
import { UserContext } from "../lib/context";

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

    const { user } = useContext(UserContext);
    const avatarSrc = user?.currentUser;  // TODO: Finish getting the real property

    return (
        <Header>
            <H1>Jailbreak</H1>

            <Avatar />
        </Header>
    )
}
