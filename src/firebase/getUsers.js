import { getData } from "./utils";

const getUsers = async () => {
  const usersSnapshot = await getData(`users`);

  if (!usersSnapshot.exists()) {
    return [];
  }

  return Object.keys(usersSnapshot.val()).map((id) => ({
    id,
    ...usersSnapshot.val()[id],
  }));
};

export default getUsers;
