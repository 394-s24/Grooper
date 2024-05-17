import { getData } from "../../firebase/utils";

const getAllSwarms = async () => {
  const swarmSnapshot = await getData(`swarms/`);

  return swarmSnapshot.val();
};

export default getAllSwarms;