
export const getDataFromApi = (property, type, object) => {
    console.log("====================================");
    console.log("type", object);
    console.log("====================================");
  
    if (property === "name") {
      if (type === "role") {
        return object.roleName;
      } else if (type === "menu") {
        return object.menuName;
      }

    }
    if (property === "id") {
      if (type === "role") {
        return object.roleID;
      } else if (type === "menu") {
        return object.menuId;
      }
    }

  };