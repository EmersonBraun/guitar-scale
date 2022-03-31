import React from 'react';
import { InstrumentSettings } from './InstrumentSettings';
import { ModeSettings } from './ModeSettings';
import { NoteList } from './NoteList';

const Settings: React.FC = () => {
  return (<>
    <InstrumentSettings />
    <ModeSettings />
    <NoteList />
  </>);
}

export default Settings;