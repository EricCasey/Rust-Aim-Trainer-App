export function FireWeapon(change) {
    // ThemeChange is an ActionbCreator, it needs to return an action,
    // an object with a type: property.
    // console.log("Fire Weapon Called: ", change)
      return {
        type: 'FIRE_WEAPON',
        payload: change
      };
    }