export function WeaponChange(change) {
    // ThemeChange is an ActionbCreator, it needs to return an action,
    // an object with a type: property.
    // console.log("Weapon Change Called: ", change)
      return {
        type: 'WEAPON_CHANGE',
        payload: change
      };
    }