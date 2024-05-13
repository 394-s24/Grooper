import { getData } from "./utils";

const getNameFromId = async (id) => {
  const nameSnapshot = await getData(`users/${id}`);

  if (!nameSnapshot.exists()) {
    return null;
  }

  const name = nameSnapshot.val().first_name;
  return name;
};

export default getNameFromId;
