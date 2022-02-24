import styled from "styled-components";
import Avatar from './Avatar';

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

export default function PageHeader({ avatarSrc }) {

    return (
        <Header>
            <H1>Jailbreak</H1>

            <Avatar />
        </Header>
    )
}
