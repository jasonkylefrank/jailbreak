import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, googleAuthProvider } from "../lib/firebase";
import styled from "styled-components";
import Button from '@mui/material/Button';


const GoogleGSVGWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  ${'' /* These paddings are just a quick hack to help center the "G" since SVG needs work to actually center its contents */}
  padding-top: 4px;
  padding-left: 2px;

  margin-right: 8px;
`;


export default function LogInButton({ rootComponent }) {
  const signInWithGoogle = async () => {
    try {  
      await signInWithPopup(auth, googleAuthProvider);
    } 
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(`Error trying to sign in user "${email}" using crendential: ${credential}. Error message: ${errorMessage}`);      
    }
  };

  const RootComponent = rootComponent || Button;

  return (
    // <Button onClick={signInWithGoogle}>
    <RootComponent onClick={signInWithGoogle}>
      <GoogleGSVGWrapper>
        <GoogleGSVG size={"20px"} />
      </GoogleGSVGWrapper>
      Log in with Google
    </RootComponent>
    // </Button>
  );
}


// Just the "G" of the Google logo
function GoogleGSVG({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <g opacity="1" 
          transform="matrix(1,0,0,1,9.361000061035156,9.559000015258789)"
        >
          <path fill="rgb(95,99,104)" 
            fillOpacity="1" 
            d=" M0.37599998712539673,9.309000015258789 C-4.7769999504089355,9.309000015258789 
                -9.111000061035156,5.131999969482422 -9.111000061035156,
                0 C-9.111000061035156,-5.13100004196167 -4.7769999504089355,
                -9.309000015258789 0.37599998712539673,-9.309000015258789 C3.2279999256134033,
                -9.309000015258789 5.256999969482422,-8.196000099182129 6.785999774932861,
                -6.743000030517578 C6.785999774932861,-6.743000030517578 4.98199987411499,
                -4.949999809265137 4.98199987411499,-4.949999809265137 C3.888000011444092,
                -5.9710001945495605 2.4059998989105225,-6.765999794006348 0.37599998712539673,
                -6.765999794006348 C-3.38700008392334,-6.765999794006348 -6.328999996185303,
                -3.746000051498413 -6.328999996185303,0 C-6.328999996185303,3.746999979019165 
                -3.38700008392334,6.767000198364258 0.37599998712539673,6.767000198364258 
                C2.815999984741211,6.767000198364258 4.208000183105469,5.789999961853027 
                5.0980000495910645,4.90500020980835 C5.827000141143799,4.177999973297119 6.307000160217285,
                3.134000062942505 6.48799991607666,1.7029999494552612 C6.48799991607666,1.7029999494552612 
                0.37599998712539673,1.7029999494552612 0.37599998712539673,1.7029999494552612 
                C0.37599998712539673,1.7029999494552612 0.37599998712539673,-0.8399999737739563 
                0.37599998712539673,-0.8399999737739563 C0.37599998712539673,-0.8399999737739563 
                8.975000381469727,-0.8399999737739563 8.975000381469727,-0.8399999737739563 
                C9.065999984741211,-0.38600000739097595 9.111000061035156,0.1599999964237213 
                9.111000061035156,0.75 C9.111000061035156,2.6570000648498535 8.586000442504883,
                5.01800012588501 6.8979997634887695,6.698999881744385 C5.25600004196167,8.401000022888184
                 3.1589999198913574,9.309000015258789 0.37599998712539673,9.309000015258789z"
          >
          </path>
        </g>
    </svg>
  );
}