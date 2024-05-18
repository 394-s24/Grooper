// times = matrix
// k = number of groups
function minimizeTimes(times, k) {
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

      // for each person on our wider team
      for (let i = 0; i < n; i++) {
        const currentGroup = groups[i];

        // Calculate current contribution to group time
        const currentContribution = times[i].reduce((acc, time, j) => {
            return acc + (groups[j] === currentGroup && i !== j ? time : 0);
          }, 0);

        // Try moving to another group
        for (let g = 0; g < k; g++) {
            if (g === currentGroup) continue;

            // for every member in group g
            const indices = [];
            for (let j = 0; j < n; j++) {
                if (groups[j] === g) {
                    indices.push(j);
                }
            }

            for (let j = 0; j < indices.length; j++) {

                // calculate the current contribution of the jth member of group g
                const currentContributionG = times[indices[j]].reduce((acc, time, l) => {
                    return acc + (groups[l] === g && indices[j] !== l ? time : 0);
                  }, 0);


                // swap the ith member with the jth member
                const temp = groups[i];
                groups[i] = groups[indices[j]];
                groups[indices[j]] = temp;

                // calculate the new contribution of the ith member
                const newContribution = times[i].reduce((acc, time, l) => {
                    return acc + (groups[l] === groups[i] && i !== l ? time : 0);
                  }, 0);


                // calculate the new contribution of the jth member
                const newContributionG = times[indices[j]].reduce((acc, time, l) => {
                    return acc + (groups[l] === groups[indices[j]] && indices[j] !== l ? time : 0);
                  }, 0);


                // calculate the change in contribution
                const change = newContribution - currentContribution + newContributionG - currentContributionG;

                // if the change is negative, keep the swap
                if (change < 0) {
                    improvement = true;
                    console.log("improvement")
                    break;
                } else {
                    // otherwise, swap back
                    const temp = groups[i];
                    groups[i] = groups[indices[j]];
                    groups[indices[j]] = temp;
                }
            }

            if (improvement) {
                break;
            }
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
  
  export default minimizeTimes;
  