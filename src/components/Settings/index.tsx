import React from 'react';
import { InstrumentSettings } from './InstrumentSettings';
import { ModeSettings } from './ModeSettings';

const Settings: React.FC = () => {
  return (<>
    <InstrumentSettings />
    <ModeSettings />
  </>);
}

export default Settings;