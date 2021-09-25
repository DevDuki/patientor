import React from 'react';

import { Entry } from '../types';
import EntryDetail from './EntryDetail';

interface EntryListingProps { entries: Entry[]}

const EntryListing = ({ entries }: EntryListingProps) => {

  return (
    <div>
      <h3>entries</h3>
      {entries.map((entry: Entry) =>
        <EntryDetail key={entry.id} entry={entry} />
      )}
    </div>
  );
};

export default EntryListing;