import { getData } from "../../firebase/utils";

const getNameFromId = async (id) => {
  const nameSnapshot = await getData(`users/${id}`);
  const name = nameSnapshot.val().first_name;
  return name;
};

export default getNameFromId;
