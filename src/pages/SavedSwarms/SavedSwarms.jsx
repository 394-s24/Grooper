import React, { useState, useEffect } from "react";
import { Card, Accordion } from "react-bootstrap";
import getAllSwarms from "./getAllSwarms";
import getNameFromId from "../../firebase/getNameFromId";

const SwarmDisplay = () => {
  const [swarms, setSwarms] = useState([]);

  useEffect(() => {
    (async () =>
      getAllSwarms().then(async (swarmsData) => {
        await Promise.all(
          swarmsData.map(async (swarm) => {
            await Promise.all(
              swarm.subswarms.map(async (subswarm) => {
                subswarm.members = await Promise.all(
                  subswarm.members.map(async (id) => {
                    return { id, name: await getNameFromId(id) };
                  })
                );
              })
            );
          })
        );
        setSwarms(
          swarmsData.sort(
            (a, b) => new Date(b.start_time) - new Date(a.start_time)
          )
        );
      }))();
  }, []);

  return (
    <div>
      {swarms.length > 0 ? (
        <Accordion defaultActiveKey="0">
          {swarms.map((swarm, index) => (
            <Accordion.Item key={`${swarm}-${index}`} eventKey={index}>
              <Accordion.Header>
                {swarm.name} -{" "}
                {new Date(swarm.start_time).toLocaleString([], {
                  dateStyle: "short",
                  timeStyle: "short",
                })}{" "}
                {swarm.end_time && (
                  <>
                    to{" "}
                    {new Date(swarm.end_time).toLocaleString([], {
                      timeStyle: "short",
                    })}
                  </>
                )}
              </Accordion.Header>
              <Accordion.Collapse eventKey={index}>
                <Card.Body>
                  {swarm.subswarms &&
                    Object.entries(swarm.subswarms).map(([subId, subData]) => (
                      <Card key={subId}>
                        <Card.Header>{subData.topic}</Card.Header>
                        <Card.Body>
                          {subData.members.map((member) => (
                            <div key={`${subId}-${member.id}`}>
                              {member.name}
                            </div>
                          ))}
                        </Card.Body>
                      </Card>
                    ))}
                </Card.Body>
              </Accordion.Collapse>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <div>No swarms available.</div>
      )}
    </div>
  );
};

export default SwarmDisplay;
