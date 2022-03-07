import { useState, useEffect } from 'react';


// Inspired by: https://stackoverflow.com/a/68736194/718325
// Should prevent Next.js from rendering the children of this component on the server,
//  thus solves a warning like: Warning: Expected server HTML to contain a matching <div> in <div>.


export default function RenderOnClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }

  return (
    <>{children}</>
  )
}
