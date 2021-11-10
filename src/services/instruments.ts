import { INSTRUMENT_TUNING_PRESETS } from "../constants";

export type Instruments = "Guitar (6 strings)" | "Guitar (7 strings)" | "Bass (4 strings)" | "Bass (5 strings)" | "Banjo (5 strings)" | "Ukulele (Soprano)" | "Ukulele (Baritone)"
interface GetInstrumentPreset {
  name: Instruments;
}

export const getInstrumentPreset = ({ name }: GetInstrumentPreset) => {
  return INSTRUMENT_TUNING_PRESETS[name];
};
