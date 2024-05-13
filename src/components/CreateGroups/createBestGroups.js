import { getData, setData } from "../../firebase/utils";
import minimizeGroupTimes from "../../utils/minimizeGroupTimes";

import getNameFromId from "./getNameFromId";


const createBestGroups = async ({ swarmId, groupNames, numGroups, users}) => {

    const metricsSnapshot = await getData(`metrics`);
    const data = metricsSnapshot.val();
    const table = Array(users.length).fill(Array(users.length).fill(null));

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

    const groups = Array.from({ length: numGroups }).map((_, idx) => ({ id: idx, topic: groupNames[idx], members: [] }));

    minimizedGroups.forEach(async (group, index) => {
        const nameToAdd = await getNameFromId(indexToId[index]);
        console.log("nameToAdd", nameToAdd)
        groups[group].members.push(nameToAdd);
    });

    // await setData(`swarms/${swarmId}/`)
    
    return groups;
}

export default createBestGroups;