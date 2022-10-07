import styled from "styled-components";
import HubIcon from '@mui/icons-material/Hub';
import Tooltip from '@mui/material/Tooltip';
import { emulatedFirebaseServices } from '../lib/firebase';


//#region --- Styled Components ---
const StyledTooltip = styled(Tooltip)`
  ${'' 
  /* TODO: Try to find a way to make the tooltip appear closer to the notice (right now it's 
            probably messed up because of the rotated and fixed-position nature of the notice) 
  */}
  ${'' /* left: 100px; */}
  ${'' /* margin: 0; */}
`;

const Wrapper = styled.div`  
  padding: 8px;    
  color: #ca6635;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  transform: rotate(-45deg);
  position: fixed;
  bottom: 26px;
  right: -48px;
  background-color: #ca663530;
  transform-origin: right;
  /* padding-bottom: 51px; */
  padding: 9px 50px 48px 50px;
`;

const EmulationTagline = styled.label`
  font-size: 9px;
  margin-bottom: 6px;
`;

// Possible Material icons: hub, laptop, dns, spoke
const EmulationIcon = styled(HubIcon)`
  transform: rotate(45deg);
  height: 20px;
  width: 20px;  
`;

//#endregion --- end styled components ---

export default function EmulationNotice() {
  const emulatedItemsStr = Object.keys(emulatedFirebaseServices).join(', ');

  const tooltipStr = `Emulated Firebase: ${emulatedItemsStr}`;

  return (
    <StyledTooltip title={tooltipStr} placement="left-start">
      <Wrapper>
        <EmulationTagline>Emulators running</EmulationTagline>
        <EmulationIcon />
      </Wrapper>
    </StyledTooltip>
  );
}
