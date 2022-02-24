module.exports = {
  reactStrictMode: true,

  // Adding this to resolve an issue with Styled Components– the warning that gets thrown
  //  in the console after a page refresh ("Prop 'className' did not match...")
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  }

}
