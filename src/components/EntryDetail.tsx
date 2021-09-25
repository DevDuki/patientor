import React from 'react';

import { useStateValue } from '../state';

import { Entry } from '../types';
import { Icon, Header, Segment } from 'semantic-ui-react';

interface EntryDetailProps { entry: Entry }

const EntryDetail = ({ entry }: EntryDetailProps) => {

  const [{ diagnosis }] = useStateValue();

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandles discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const getMatchingIcon = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return <Icon name='user md' />;
      case 'Hospital':
        return <Icon name='hospital' />;
      case 'OccupationalHealthcare':
        return <Icon name='ambulance' />;
      default:
        return assertNever(entry);
    }
  };

  const renderDiagnosisList = (diagnosisCodes: string[]) => {
    return (
      <Segment attached>
        Diagnoses:<br />
        {diagnosisCodes.map(code =>
          <div key={code}>
            {code} {diagnosis[code].name} <br />
          </div>
        )}
      </Segment>
    );
  };


  return (
    <div>
      <Header as='h3' attached='top' key={entry.id}>
        {entry.date} {getMatchingIcon()}
      </Header>
      <Segment attached>
        {entry.description}
      </Segment>
      {entry.diagnosisCodes
        ? renderDiagnosisList(entry.diagnosisCodes)
        : null
      }
    </div>
  );
};

export default EntryDetail;
