import { getData } from "../../firebase/utils";

const getAllSwarms = async () => {
  const swarmSnapshot = await getData(`swarms/`);

  if (!swarmSnapshot.exists()) {
    return [];
  }

  return Object.entries(swarmSnapshot.val()).map(([id, data]) => ({
    id,
    ...data,
  }));
};

export default getAllSwarms;
