import { getData } from "../../firebase/utils";

const getUsers = async () => {
  const swarmSnapshot = await getData(`users`);

  const data = swarmSnapshot.val();

  const values = data ? Object.values(data) : [];

  return values;
};

export default getUsers;