import { INSTRUMENT_TUNING_PRESETS } from "../constants";

export type Instruments = "Guitar" | "Bass (4 strings)" | "Bass (5 strings)" | "Ukulele"
interface GetInstrumentPreset {
  name: Instruments;
}

export const getInstrumentPreset = ({ name }: GetInstrumentPreset) => {
  return INSTRUMENT_TUNING_PRESETS[name];
};
