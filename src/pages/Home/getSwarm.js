import { getData } from "../../firebase/utils";

const getSwarm = async () => {
  const swarmSnapshot = await getData(`swarms/-NxK37qfhhv5HqlXvWQc`);

  return swarmSnapshot.val();
};

export default getSwarm;