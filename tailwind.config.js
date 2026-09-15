/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed-variant":"#004e5c","error-container":"#93000a","on-primary-fixed-variant":"#372abf","surface-container-highest":"#2d3449","error":"#ffb4ab","tertiary":"#4cd7f6","on-surface":"#dae2fd","secondary-fixed-dim":"#c0c1ff","on-tertiary-fixed":"#001f26","on-tertiary-container":"#4ad5f4","primary-fixed":"#e3dfff","tertiary-container":"#005a6a","on-error":"#690005","outline-variant":"#464554","surface-bright":"#31394d","on-primary-container":"#c1beff","tertiary-fixed":"#acedff","surface-variant":"#2d3449","on-secondary-container":"#b0b2ff","primary":"#c3c0ff","surface":"#0b1326","inverse-primary":"#5148d7","background":"#0b1326","on-error-container":"#ffdad6","surface-container-high":"#222a3d","secondary":"#c0c1ff","on-secondary-fixed":"#07006c","surface-tint":"#c3c0ff","on-tertiary":"#003640","on-primary":"#1f00a4","secondary-fixed":"#e1e0ff","surface-dim":"#0b1326","primary-fixed-dim":"#c3c0ff","surface-container-low":"#131b2e","inverse-surface":"#dae2fd","surface-container":"#171f33","primary-container":"#4338ca","on-secondary-fixed-variant":"#2f2ebe","secondary-container":"#3131c0","on-surface-variant":"#c7c4d7","on-background":"#dae2fd","on-primary-fixed":"#100069","inverse-on-surface":"#283044","outline":"#918fa0","on-secondary":"#1000a9","tertiary-fixed-dim":"#4cd7f6","surface-container-lowest":"#060e20"
      },
      spacing: {
        "margin-sm":"1rem","space-xl":"2rem","gutter-sm":"1rem","space-xs":"0.25rem",margin:"2rem","space-sm":"0.5rem","space-md":"1rem",gutter:"1.5rem","space-lg":"1.5rem"
      },
      fontSize: {
        "headline-xl-mobile":["28px",{lineHeight:"36px",letterSpacing:"-0.015em",fontWeight:"600"}],"display-lg-mobile":["32px",{lineHeight:"40px",letterSpacing:"-0.02em",fontWeight:"700"}],"headline-md":["20px",{lineHeight:"28px",letterSpacing:"-0.01em",fontWeight:"600"}],"display-lg":["48px",{lineHeight:"56px",letterSpacing:"-0.025em",fontWeight:"700"}],"body-md":["14px",{lineHeight:"22px",letterSpacing:"0em",fontWeight:"400"}],"label-sm":["12px",{lineHeight:"16px",letterSpacing:"0.02em",fontWeight:"500"}],"headline-xl":["36px",{lineHeight:"44px",letterSpacing:"-0.02em",fontWeight:"600"}],"body-lg":["16px",{lineHeight:"26px",letterSpacing:"0em",fontWeight:"400"}],"title-sm":["16px",{lineHeight:"24px",letterSpacing:"-0.005em",fontWeight:"600"}],"label-md":["14px",{lineHeight:"20px",letterSpacing:"0.01em",fontWeight:"500"}],"body-sm":["12px",{lineHeight:"18px",letterSpacing:"0.005em",fontWeight:"400"}],"headline-lg":["24px",{lineHeight:"32px",letterSpacing:"-0.015em",fontWeight:"600"}],caption:["11px",{lineHeight:"14px",letterSpacing:"0.04em",fontWeight:"500"}]
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        type: ["var(--font-courier-prime)", "monospace"],
        mono: ["var(--font-plex-mono)", "monospace"],
        "headline-xl-mobile":["var(--font-inter)", "sans-serif"],"display-lg-mobile":["var(--font-inter)", "sans-serif"],"headline-md":["var(--font-inter)", "sans-serif"],"display-lg":["var(--font-inter)", "sans-serif"],"body-md":["var(--font-inter)", "sans-serif"],"label-sm":["var(--font-inter)", "sans-serif"],"headline-xl":["var(--font-inter)", "sans-serif"],"body-lg":["var(--font-inter)", "sans-serif"],"title-sm":["var(--font-inter)", "sans-serif"],"label-md":["var(--font-inter)", "sans-serif"],"body-sm":["var(--font-inter)", "sans-serif"],"headline-lg":["var(--font-inter)", "sans-serif"],caption:["var(--font-inter)", "sans-serif"]
      },
    },
  },
  plugins: [],
};
