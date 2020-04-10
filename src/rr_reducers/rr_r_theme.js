// state argument isn't app state, only the state this reducer is
// responsible for.

import ThemesObj from '../objects/themes';

export default function(state = null, action) {
  switch (action.type) {

    case 'THEME_CHANGE':
      if(action.payload.change === 'background') {
        return {
          ...state,
          background: action.payload.color
        }
      } else if(action.payload.change === 'borderColor') {
        return {
          ...state,
          borderColor: action.payload.color
        }
      } else if(action.payload.change === 'altBackground') {
        console.log("alt background changed")
        return {
          ...state,
          altBackground: action.payload.color
        }
      } else if(action.payload.change === 'altBorderColor') {
        console.log("alt border changed")
        return {
          ...state,
          altBorderColor: action.payload.color
        }
      } else if(action.payload.change === 'text') {
        return {
          ...state,
          text: action.payload.color
        }
      } else if(action.payload.change === 'previewLoad') {
        console.log("previewLoad at theme reducer")
        return {
          ...state,
          background: action.payload.background,
          borderColor: action.payload.borderColor,
          altBackground: action.payload.altBackground,
          altBorderColor: action.payload.altBorderColor,
          icon: action.payload.icon,
          text: action.payload.text,
          borders: action.payload.borders,
          crazy: action.payload.crazy,
          offset: action.payload.offset,
          borderRadius: action.payload.borderRadius,
          borderStyle: action.payload.borderStyle,
          hfont: action.payload.hfont.value,
          ffont: action.payload.ffont.value
        }
      } else if(action.payload.target.id === 'defaulttheme') {
        return {
          background: '#000',
          text: 'white',
          borderColor: 'lightgreen',
          borderWidth: '2px',
          borderRadius: '4px',
          borderStyle: 'solid',
          shadowColor: 'red',
          altBorderColor: '#2121213C',
          altBackground: '#2121213C',
          mono: '',
          crazy: false,
          invert: false
        }
      } else if(action.payload.target.id === 'randomtheme') {
        var theme = [];
        for (var c = 0; c < 6; c++) {
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
          }
          theme.push(color)
        }
        return {
          text: theme[0],
          borderColor: theme[1],
          background: theme[2],
          altBackground: theme[3],
          altBorderColor: theme[4]
        }
      } else if(action.payload.target.id === 'monoswitch') {
        if (state.mono === '' || state.mono === 'white') {
          return {background: '#000', borderColor: '#fff', text: '#fff', mono: 'black', altBackground: '#000', altBorderColor: '#FFF' }
        } else {
          return {background: '#fff', borderColor: '#000', text: '#000', mono: 'white', altBackground: '#FFF', altBorderColor: '#000' }
        }
      } else if(action.payload.target.id === 'invertapp') {
        return state.invert ?
                { invert: false }
                : { invert: true }
      } else if(!isNaN(action.payload.target.id)) {
        var themes = ThemesObj.themes
        return {
          background: themes[action.payload.target.id - 1].background,
          text: themes[action.payload.target.id - 1].text,
          borderColor: themes[action.payload.target.id - 1].borderColor,
          altBorderColor: themes[action.payload.target.id - 1].altBorderColor,
          altBackground: themes[action.payload.target.id - 1].altBackground,
          iconColor: themes[action.payload.target.id - 1].iconColor,
          borderRadius: themes[action.payload.target.id - 1].borderRadius,
          crazy: themes[action.payload.target.id - 1].crazy,
          ffont: themes[action.payload.target.id - 1].ffont,
          hfont: themes[action.payload.target.id - 1].hfont,
          offset: themes[action.payload.target.id - 1].offset,
          borderStyle: themes[action.payload.target.id - 1].borderStyle,
        }
      } else {
        console.log("else case in theme reducer")
        console.log(action.payload)
        return state
      }

    case 'LOAD_CASE':
    console.log(action.payload);
    let settings = action.payload.settings
      return {
        ...state,
        background: settings.background,
        text: settings.text,
        altBackground: settings.altbackground,
        borderColor: settings.bordercolor,
        altBorderColor: settings.altbordercolor,
      }

    case 'HARD_RESET':
      return {
        background: "#000",
        text: "white",
        altBackground: "#2121213C",
        borderColor: "lightgreen",
        altBorderColor: "#2121213C",
        shadowColor: "red",
        mono: "",
        crazy: false,
        invert: false
      }

    case '@@redux/INIT':
      return {
        background: "#000000",
        altBackground: "#2121213C",
        text: "#ffffff",
        borderColor: "#90EE90",
        altBorderColor: "#212121",
        shadowColor: "red",
        mono: "",
        crazy: false,
        borders: true,
        invert: false
      }
    default:
      //console.log(action)
      return state
  }
  //return state  not the react state, the APp state
}