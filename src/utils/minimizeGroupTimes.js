// times = matrix
// k = number of groups
function minimizeGroupTimes(times, k) {
    const n = times.length;
    // Initialize group sizes array to keep track of each group's size
    let groupSizes = new Array(k).fill(0);
    // Evenly distribute members across groups initially
    let groups = Array.from({ length: n }, (_, index) => {
      const group = index % k;
      groupSizes[group]++;
      return group;
    });
  
    let improvement = true;
  
    while (improvement) {
      improvement = false;

      // For each person on our wider team
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
  
          // Ensure moving does not unbalance the group sizes excessively
          if (groupSizes[currentGroup] <= Math.ceil(n / k) && groupSizes[g] >= Math.floor(n / k) + 1) {
            const potentialNewContribution = times[i].reduce((acc, time, j) => {
              return acc + (groups[j] === g && i !== j ? time : 0);
            }, 0);
  
            // Calculate change if moved to new group
            const change = potentialNewContribution - currentContribution;
            console.log(change);
            if (change < bestDecrease) {
              bestDecrease = change;
              bestGroup = g;
            }
          }
        }
  
        // If best group found, move there and adjust group sizes
        if (bestGroup !== currentGroup) {
          groups[i] = bestGroup;
          groupSizes[currentGroup]--;
          groupSizes[bestGroup]++;
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
  

