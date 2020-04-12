export function OptionChange(change) {
    // ThemeChange is an ActionbCreator, it needs to return an action,
    // an object with a type: property.
    // console.log("Option Change Called: ", change)
      return {
        type: 'OPTION_CHANGE',
        payload: change
      };
    }