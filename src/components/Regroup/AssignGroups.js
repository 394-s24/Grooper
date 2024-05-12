function minimizeGroupTimes(times, k) {
  const n = times.length;
  let groups = Array.from({ length: n }, () => Math.floor(Math.random() * k));
  let improvement = true;

  while (improvement) {
    improvement = false;
    for (let i = 0; i < n; i++) {
      const currentGroup = groups[i];
      let bestGroup = currentGroup;
      let bestDecrease = 0;

      // Calculate current contribution to group time
      const currentContribution = times[i].reduce((acc, time, j) => {
        return acc + (groups[j] === currentGroup && i !== j ? time : 0);
      }, 0);

      // Try moving to another group
      for (let g = 0; g < k; g++) {
        if (g === currentGroup) continue;

        const potentialNewContribution = times[i].reduce((acc, time, j) => {
          return acc + (groups[j] === g && i !== j ? time : 0);
        }, 0);

        // Calculate change if moved to new group
        const change = potentialNewContribution - currentContribution;
        if (change < bestDecrease) {
          bestDecrease = change;
          bestGroup = g;
        }
      }

      // If best group found, move there
      if (bestGroup !== currentGroup) {
        groups[i] = bestGroup;
        improvement = true;
      }
    }
  }

  // Calculate final group interaction times
  const finalTimes = new Array(k).fill(0);
  groups.forEach((group, i) => {
    groups.forEach((innerGroup, j) => {
      if (i < j && group === innerGroup) {
        finalTimes[group] += times[i][j];
      }
    });
  });

  return { groups, finalTimes };
}

export default minimizeGroupTimes;

