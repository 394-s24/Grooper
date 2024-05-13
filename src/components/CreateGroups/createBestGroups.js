import { getData, setData } from "../../firebase/utils";
import minimizeGroupTimes from "../../utils/minimizeGroupTimes";
import getUsers from "../../firebase/getUsers";

const createBestGroups = async (swarmId, groupNames, numGroups) => {
  const users = await getUsers();
  const metricsSnapshot = await getData(`metrics`);
  const data = metricsSnapshot.val();
  const table = Array(users.length).fill(Array(users.length).fill(0));

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
    Object.keys(data[user]).forEach((user2) => {
      const j = idToIndex[user2];
      table[i][j] = data[user][user2];
    });
  });

  const minimizedGroups = minimizeGroupTimes(table, numGroups).groups;

  const groups = groupNames.map((groupName, idx) => ({
    id: idx,
    topic: groupName,
    members: [],
  }));

  minimizedGroups.map(async (group, index) => {
    groups[group].members.push(indexToId[index]);
  });

  await setData(`swarms/${swarmId}/subswarms`, groups);
};

export default createBestGroups;
