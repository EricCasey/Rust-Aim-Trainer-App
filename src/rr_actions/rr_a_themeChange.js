export function ThemeChange(change) {
    // ThemeChange is an ActionbCreator, it needs to return an action,
    // an object with a type: property.
    console.log("Theme Change Called: ", change)
      return {
        type: 'THEME_CHANGE',
        payload: change
      };
    }