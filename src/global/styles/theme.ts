// import backgroundLight from '../../assets/images/background-light.png';
// import backgroundDark from '../../assets/images/background-dark.png';
// import LogoDarkImg from '../../assets/images/logo-dark.png';
// import LogoLightImg from '../../assets/images/logo-light.png';
import fonts from './fonts'

export default {
  light: {
    colors: {
      primary: "#004997",
      text: "#3F3E40",
      text_secondary: "#777777",
      background: "#F6F6F6",
      background_over: "#FFFFFF",
      details: "#BBBBBB",
      // attention: '#CC3333',
      attention: "#BB4D2B",
      yellow: "#FCA600",
      white: "#FFFFFF",
      black: "#000000",
      // success: '#66cc00',
      success: "#77B309",
      red: "#d1345b",
    },
    // images: {
    //   logo: EsojaLogoDarkImg,
    //   background: backgroundLight
    // },
    ...fonts,
  },
  dark: {
    colors: {
      primary: "#ffdd66",
      text: "#EBEBEB",
      text_secondary: "#AFAFAF",
      background: "#2D282A",
      background_over: "#3F3E40",
      details: "#606060",
      // attention: '#F85149',
      attention: "#BB4D2B",
      yellow: "#FCA600",
      white: "#FFFFFF",
      black: "#000000",
      // success: '#66cc00',    },
      success: "#77B309",
      red: "#d1345b",
    },
    // images: {
    //   logo: EsojaLogoDarkImg,
    //   background: backgroundDark
    // },
    ...fonts,
  },
};
