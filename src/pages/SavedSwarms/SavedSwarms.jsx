import React, { useState, useEffect } from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import getAllSwarms from '../../firebase/utils';

const SwarmDisplay = () => {
  const [swarms, setSwarms] = useState([]);

  useEffect(() => {
    const fetchSwarms = async () => {
      const swarmsData = await getAllSwarms();
      if (swarmsData) {
        setSwarms(Object.entries(swarmsData).map(([id, data]) => ({ id, ...data })));
      }
    };

    fetchSwarms();
  }, []);

  return (
    <div>
      {swarms.length > 0 ? (
        <Accordion defaultActiveKey="0">
          {swarms.map((swarm, index) => (
            <Card key={index}>
              <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
                {swarm.name} (Start: {swarm.start_time} - End: {swarm.end_time})
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>
                  {swarm.subswarms && Object.entries(swarm.subswarms).map(([subId, subData]) => (
                    <Card key={subId}>
                      <Card.Header>Subswarm ID: {subId}</Card.Header>
                      <Card.Body>
                        <p>Topic: {subData.topic}</p>
                        <p>Members: {subData.members.join(', ')}</p>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      ) : (
        <p>No swarms available.</p>
      )}
    </div>
  );
};

export default SwarmDisplay;
