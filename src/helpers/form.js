/* 
    Rule

*/

export const createDynamicFormConst = (
  dataFromAPI = [],
  parentJSONKey = ""
) => {
  let formConstant = {};

  dataFromAPI.map((each) => {
    formConstant[`${parentJSONKey}-${each.internalName}`] = {
      type: String(each.idFieldType).toUpperCase(),
      label: each.displayName,
      jsonKey: each.internalName,
      required: Boolean(each.isMandatory),
      inputType: `${
        each.inputType || each.idFieldType || "text"
      }`.toLowerCase(),
      options: each.fieldValue,
      object: parentJSONKey,
    };
  });

  return formConstant;
};

export const renameOptionsKey = (
  data = [],
  labelKey = "codeDesc",
  valueKey = "codeDesc",
  dataKey = "masterData"
) => {
  var options = [];
  if (data[dataKey]) {
    data[dataKey].map((each) => {
      options.push({
        label: each[labelKey],
        value: each[valueKey],
      });
    });
  } else {
    data.map((each) => {
      options.push({
        label: each[labelKey],
        value: each[valueKey],
      });
    });
  }

  return options;
};

export const parseDataFromAPI = (formData) => {
  const formState = {};
  Object.keys(formData).map((parentObject) => {
    Object.keys(formData[parentObject]).map((jsonKey) => {
      if (parentObject === "organizationDetails") {
        formState[`${jsonKey}`] = formData[parentObject][jsonKey];
      } else {
        formState[`${parentObject}-${jsonKey}`] =
          formData[parentObject][jsonKey];
      }
    });
  });
  return formState;
};

export const parseDataForOrg = (formData) => {
  const submitForm = {};
  let logo;
  Object.keys(formData).forEach((objectKey) => {
    const dataValues = objectKey.split("-");
    if (dataValues[1] === "photoName") {
    }
    if (dataValues.length > 1) {
      submitForm[dataValues[0]] = {
        ...submitForm[dataValues[0]],
        [dataValues[1]]: formData[objectKey],
      };
    } else {
      if (objectKey === "photoName" && formData[objectKey]) {
        logo = formData[objectKey][0];
        submitForm[objectKey] = formData[objectKey][0].name;
      } else {
        submitForm[objectKey] = formData[objectKey];
      }
    }
  });

  const jsonFormData = new FormData();

  jsonFormData.set("logo", logo);
  jsonFormData.set("orgDetails", JSON.stringify(submitForm));

  return jsonFormData;
};

export const modifyJSONForBackend = (formData) => {
  let finalJSON = {};

  Object.keys(formData).forEach((objectKey) => {
    const dataValues = objectKey.split("-");
    if (dataValues.length > 1 && dataValues.length <= 2) {
      let parentObj = dataValues[0];
      let childObj = dataValues[1];
      console.log("===============parentObj=====================");
      console.log(parentObj, childObj, finalJSON);
      console.log("===============childObj=====================");

      let initalData = finalJSON[parentObj];

      finalJSON[parentObj] = {
        ...initalData,
        [childObj]: formData[objectKey],
      };

      delete formData[objectKey];
    }
  });

  finalJSON = {
    ...finalJSON,
    ...formData,
  };

  return finalJSON;
};

export const modifyFormDataForBackend = (formData) => {
  /*   userDetails */
  /* 
          userContactDetailsDTO-email-emailId-0: ""
     userContactDetailsDTO-email-emailType-0: ""
     userContactDetailsDTO-phoneNo-phoneNumber-0: ""
     userContactDetailsDTO-phoneNo-phoneType-0: ""
     */
  const { ...clonedformData } = formData;

  const userContactDetailsDTO = {
    email: [],
    phoneNo: [],
  };

  const email = {
    emailId: "",
    emailType: "",
  };

  const phone = {
    phoneNumber: "",
    phoneType: "",
  };

  let finalFormData = new FormData();

  let finalJSON = {};

  Object.keys(clonedformData).map((objectKey) => {
    const dataValues = objectKey.split("-");

    if (dataValues.length > 1 && dataValues.length <= 2) {
      let parentObj = dataValues[0];
      let childObj = dataValues[1];

      let initalData = finalJSON[parentObj];

      finalJSON[parentObj] = {
        ...initalData,
        [childObj]: clonedformData[objectKey],
      };

      delete clonedformData[objectKey];
    } else {
      if (objectKey === "photoName") {
        if (clonedformData[objectKey]) {
          if (clonedformData[objectKey].length > 0) {
            finalFormData.set("photo", clonedformData[objectKey][0]);

            var { ...initialFormData } = finalJSON;

            finalJSON = {
              ...initialFormData,
              [objectKey]: clonedformData[objectKey][0].name,
            };

            delete clonedformData[objectKey];
          } else {
            finalFormData.set("photo", null);

            var initialFormData = finalJSON;

            finalJSON = {
              ...initialFormData,
              [objectKey]: "",
            };

            delete clonedformData[objectKey];
          }
        }
      } else if (objectKey === "signatureName") {
        if (clonedformData[objectKey]) {
          if (clonedformData[objectKey].length > 0) {
            finalFormData.set("signature", clonedformData[objectKey][0]);

            var { ...initalData } = finalJSON;

            finalJSON = {
              ...initalData,
              [objectKey]: clonedformData[objectKey][0].name,
            };

            delete clonedformData[objectKey];
          } else {
            finalFormData.set("signature", null);

            var { ...initalData } = finalJSON;

            finalJSON = {
              ...initalData,
              [objectKey]: "",
            };

            delete clonedformData[objectKey];
          }
        }
      }
    }
    if (dataValues.length > 2) {
      let childrenObjKey = dataValues[2];

      if (childrenObjKey === "emailType") {
        email.emailType = clonedformData[objectKey];
      }
      if (childrenObjKey === "emailId") {
        email.emailId = clonedformData[objectKey];
      }
      if (childrenObjKey === "phoneNumber") {
        phone.phoneNumber = clonedformData[objectKey];
      }
      if (childrenObjKey === "phoneType") {
        phone.phoneType = clonedformData[objectKey];
      }

      if (email.emailId.length > 0 && email.emailType.length > 0) {
        var { ...thisEmail } = email;

        userContactDetailsDTO.email.push(thisEmail);

        email.emailId = "";
        email.emailType = "";
      }

      if (phone.phoneNumber.length > 0 && phone.phoneType.length > 0) {
        var { ...thisPhone } = phone;

        userContactDetailsDTO.phoneNo.push(thisPhone);

        phone.phoneNumber = "";
        phone.phoneType = "";
      }
      delete clonedformData[objectKey];
    }
  });

  finalJSON = {
    ...finalJSON,
    ...clonedformData,
  };

  let allContDetails = finalJSON["userContactDetailsDTO"];

  finalJSON["userContactDetailsDTO"] = {
    ...allContDetails,
    ...userContactDetailsDTO,
  };

  console.log("===============finalJSON=====================");
  console.log(finalJSON);
  console.log("===============finalJSON=====================");

  finalFormData.set("userDetails", JSON.stringify(finalJSON));

  return finalFormData;
};
//  TODO
// only used in user edit screen
const destructureForForm = (apiResponse) => {
  const formNames = {};
  const userEducationDetailsDTO = "userEducationDetails";
  const userPrimaryAddressDetailsDTO = "userPrimaryAddressDetails";
  const userSecondaryAddressDetailsDTO = "userSecondaryAddressDetails";
  const userContactDetailsDTO = "userContactDetails";

  Object.keys(apiResponse).map((objKey) => {
    if (userEducationDetailsDTO === objKey) {
      if (userEducationDetailsDTO) {
      }
    }
  });
};

// using spread syntax prevent direct manipulation
export const normalizeBookForm = (
  { ...formConstant },
  { ...inputData },
  initialObject = {}
) => {
  const { ...finalJSON } = formConstant.finalJSON;

  Object.keys(inputData).map((inputKey) => {
    const splitKeys = inputKey.split("-");
    if (splitKeys.length < 4) {
      console.error(
        `inputDataKey must be divided in four, but got only ${splitKeys.length}`
      );
      return;
    }
    const { ...initialFinalJSON } = finalJSON;
    const [
      parentJsonKey,
      subParentJSONKey,
      inputJSONkey,
      index,
    ] = splitKeys.concat();

    const { ...initalJSONChild } = initialFinalJSON[parentJsonKey];

    // initalJSONChild[subParentJSONKey]
  });
};
