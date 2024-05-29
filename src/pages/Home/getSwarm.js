import { getData } from "../../firebase/utils";

const getSwarm = async (id) => {
  const swarm = await getData(`swarms/${id}`);

  return swarm.val();
};

export default getSwarm;
