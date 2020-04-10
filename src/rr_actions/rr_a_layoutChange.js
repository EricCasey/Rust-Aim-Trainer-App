export function LayoutChange(change) {
    // ThemeChange is an ActionbCreator, it needs to return an action,
    // an object with a type: property.
    console.log("Layout Change Called: ", change)
      return {
        type: 'LAYOUT_CHANGE',
        payload: change
      };
    }