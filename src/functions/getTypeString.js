import { titleCase } from "./titleCase";

export const getTypeString = (typeList) => {
	let twoTypes = false;
	let typeString = "";
	for (let i = 0; i < typeList.length; i++) {
		typeString += twoTypes
			? "/" + titleCase(typeList[i].type.name)
			: titleCase(typeList[i].type.name);
		twoTypes = true;
	}
	return typeString;
};
