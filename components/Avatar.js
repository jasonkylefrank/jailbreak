import styled from 'styled-components';

const AvatarImg = styled.img`
    width: 40px;
    border-radius: 100%;
`;

export default function Avatar({ src, onClick }) {
  const diceBearSeed = 'jailbreak' + Date.now;
  // Dicebear: https://avatars.dicebear.com/
  const source = src || `https://avatars.dicebear.com/api/open-peeps/:${diceBearSeed}.svg`;

  return (
    <AvatarImg src={source} alt="Avatar" onClick={onClick}></AvatarImg>
  );
}
