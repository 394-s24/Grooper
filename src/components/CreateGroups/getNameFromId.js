import { getData } from "../../firebase/utils";

const getNameFromId = async ( id ) => {
    console.log("id", id)
  const nameSnapshot = await getData(`users/${id}`);
  const name = nameSnapshot.val().first_name;
  console.log("name", name)
  return name
};

export default getNameFromId;