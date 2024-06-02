import { getData, pushData, setData } from "../../firebase/utils";
import getUsers from "../../firebase/getUsers";
import minimizeTimes from "../../utils/minimizeTimes";

const createBestGroups = async (groupNames, numGroups) => {
  if (numGroups === 0) {
    await setData(`currSwarm`, null);
    return;
  }

  const users = await getUsers();
  const metricsSnapshot = await getData(`metrics`);
  const data = metricsSnapshot.val();
  const table = [];
  for (let i = 0; i < users.length; i++) {
    table.push(new Array(users.length).fill(0));
  }
  const indexToId = {};
  const idToIndex = {};

  Object.keys(data).forEach((user, index) => {
    indexToId[index] = user;
    idToIndex[user] = index;
  });

  // for each key, val in data
  // get the table index from key, call it i
  // set table[i][i] = 0

  // for each key2, val2 in val
  // get the table index from key2, call it j
  // set table[i][j] = val2
  Object.keys(data).forEach((user) => {
    const i = idToIndex[user];
    table[i][i] = 0;
    console.log(data[user]);
    Object.keys(data[user]).forEach((user2) => {
      const j = idToIndex[user2];
      table[i][j] = data[user][user2];
    });
  });

  const minimizedGroups = minimizeTimes(table, numGroups).groups;

  const groups = groupNames.map((groupName, idx) => ({
    id: idx,
    topic: groupName,
    members: [],
  }));

  minimizedGroups.map(async (group, index) => {
    groups[group].members.push(indexToId[index]);
  });

  const id = await pushData("swarms", {
    name: "Swarm",
    start_time: new Date().toISOString(),
    subswarms: groups,
  });

  setData("currentSwarm", id.key);

  return groups;
};

export default createBestGroups;
