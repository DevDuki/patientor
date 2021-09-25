import React, { useEffect, useState } from 'react';
import axios from "axios";

import { useStateValue, selectPatient } from '../state';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from "../constants";
import { Icon, Button } from 'semantic-ui-react';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

import EntryListing from '../components/EntryListing';
import AddEntryModal from '../AddEntryModal';

const PatientPage = () => {
  const [{ selectedPatient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const id = useParams<{ id: string }>().id;
  const patient: Patient = selectedPatient[id];

  useEffect( () => {
    const fetchPersonData = async (id: string) => {
      try {
        if(selectedPatient[id]) return;
        const { data: fetchedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(selectPatient(fetchedPatient));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error(e);
      }
    };

    void fetchPersonData(id);
  }, [id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = ():void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (entry: EntryFormValues) => {
    try {
      const { data: editedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry);
      dispatch(selectPatient(editedPatient));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
    }

  };

  return (
    <>
      {patient
        ?
        <>
          <h2>{patient.name} <Icon name={patient.gender === 'male' ? 'mars' : 'venus'} /></h2>
          <p>
            ssn: {patient.ssn}<br />
            occupation: {patient.occupation}
          </p>
          <EntryListing entries={patient.entries} />
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add new Entry</Button>
        </>
        : <p>Couldnt find patient</p>
      }

    </>
  );
};

export default PatientPage;