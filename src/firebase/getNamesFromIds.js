import getNameFromId from "./getNameFromId";

const getNamesFromIds = async (ids) => {
  const names = await Promise.all(ids.map((id) => getNameFromId(id)));

  return names;
};

export default getNamesFromIds;
