import { Button } from "react-bootstrap";
import minimizeGroupTimes from "./AssignGroups";

export default function Regroup() {
  const times = [
    [0, 2, 3, 4, 1],
    [2, 0, 5, 1, 2],
    [3, 5, 0, 2, 3],
    [4, 1, 2, 0, 4],
    [3, 1, 3, 1, 0],
  ];
  const k = 2;
  const result = minimizeGroupTimes(times, k);

  return (
    <div>
      <div>Group Assignment Results</div>
      <div>Groups: {JSON.stringify(result.groups)}</div>
      <div>
        Interaction Times per Group: {JSON.stringify(result.finalTimes)}
      </div>
    </div>
  );
}