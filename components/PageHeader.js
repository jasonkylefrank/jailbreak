import styled from "styled-components"

const Header = styled.header`
    background-color: pink;
    padding: 12px;
    height: 64px;
    display: flex;
    align-items: center;
`;

const H1 = styled.h1`
    color: brown;
    margin: 0;
    font-weight: normal;
`;

export default function PageHeader() {
    return (
        <Header>
            <H1>Jailbreak</H1>
        </Header>
    )
}
