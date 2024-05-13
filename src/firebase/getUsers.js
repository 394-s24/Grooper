import { getData } from "./utils";

const getUsers = async () => {
  const usersSnapshot = await getData(`users`);

  if (!usersSnapshot.exists()) {
    return [];
  }

  return Object.values(usersSnapshot.val());
};

export default getUsers;
