// import React, { useCallback, useEffect, useState } from "react";
// import { Modes, MODES, NOTES_FLAT, NOTES_SHARP } from "../constants";
// import { CHROMATIC } from "../constants/chromatic";
// import { Instruments } from "../services/instruments";
// import { getCurrentNoteIndex, getNoteName } from "../services/notes";


// export const DEFAULT_CONFIG = {
//   instrument: "Guitar (6 strings)" as Instruments,
//   accidental: "flats" as Accidental,
//   numberOfFrets: 22,
//   pentatonic: false,
//   blueNote: false,
//   mode: "DORIAN" as Modes,
//   note: {
//     flats: "C",
//     sharps: "C",
//     index: 1,
//   } as NoteInterface,
// };
// export const ConfigContext = React.createContext({} as Expose);

// export type Accidental = "flats" | "sharps";
// interface ConfigProps {
//   children?: React.ReactNode;
// }

// interface GetModePattern {
//   mode: Modes;
//   pentatonic: boolean;
//   blueNote: boolean
// }

// export interface NoteInterface {
//   flats: string;
//   sharps: string;
//   index: number;
// }

// interface Expose {
//   instrument: Instruments;
//   accidental: Accidental;
//   numberOfFrets: number;
//   mode: string;
//   note: NoteInterface;
//   noteHover?: NoteInterface;
//   pentatonic: boolean
//   mountedMode: any[]
//   mountedModeWithNames: any[]

//   setInstrument: (data: Instruments) => void;
//   setAccidental: (data: Accidental) => void;
//   setNumberOfFrets: (data: number) => void;
//   setMode: (data: Modes) => void;
//   setNote: (data: NoteInterface) => void;
//   setNoteHover: (data: NoteInterface | undefined) => void;
//   togglePentatonic: () => void;
//   toggleBlueNote: () => void;
//   getNoteIndex: (indexOfNote: number) => any;
//   mountMode: (data: any) => any;
// }

// export const ConfigProvider = ({ children }: ConfigProps) => {
//   const [instrument, setInstrument] = useState<Instruments>(DEFAULT_CONFIG.instrument);
//   const [accidental, setAccidental] = useState<Accidental>(DEFAULT_CONFIG.accidental);
//   const [numberOfFrets, setNumberOfFrets] = useState(
//     DEFAULT_CONFIG.numberOfFrets
//   );
//   const [mode, setMode] = useState<Modes>(DEFAULT_CONFIG.mode);
//   const [note, setNote] = useState(DEFAULT_CONFIG.note);
//   const [noteHover, setNoteHover] = useState<NoteInterface | undefined>(undefined);
//   const [mountedMode, setMountedMode] = useState<any[]>(MODES[DEFAULT_CONFIG.mode]);
//   const [mountedModeWithNames, setMountedModeWithNames] = useState<any[]>(MODES[DEFAULT_CONFIG.mode]);
//   const [pentatonic, setPentatonic] = useState<boolean>(DEFAULT_CONFIG.pentatonic);
//   const [blueNote, setBlueNote] = useState<boolean>(DEFAULT_CONFIG.blueNote);

//   useEffect(() => {
//     updateMode()
//   }, [mode, pentatonic, blueNote])

//   const updateMode = useCallback(() => {
//     const mountedMode = getModePattern()
//     const getModeWithNames = mountedMode.map(note => ({
//       index: note,
//       flat: NOTES_FLAT[note - 1],
//       sharp: NOTES_SHARP[note - 1]
//     }))
//     setMountedModeWithNames(() => getModeWithNames)
//     setMountedMode(() => mountedMode)
//   }, [])

//   const handleMode = useCallback((mode: any) => {
//     updateMode()
//     setMode(() => mode)
//   }, [])

//   const togglePentatonic = useCallback(() => {
//     updateMode()
//     setPentatonic((oldState) => !oldState)
//   },[])

//   const toggleBlueNote = useCallback(() => {
//     updateMode()
//     setBlueNote((oldState) => !oldState)
//   },[])

//   const getNoteIndex = useCallback((indexOfNote: number) => {
//     return CHROMATIC.find(({ index }) => index === indexOfNote);
//   },[])
  
//   const getModePattern = useCallback(() => {
//     const modePathern = MODES[mode]
//     console.log(pentatonic)

//     // if(blueNote) {
//     //   if(modePathern.includes(4) && !modePathern.includes(7)) {
//     //     modePathern.push(7)
//     //   } 
//     //   if(!modePathern.includes(4)) {
//     //     modePathern.push(4)
//     //   }
//     // }

//     // if(pentatonic) {
//     //   if(modePathern.length > 5) {
//     //     modePathern.splice(3, 1);
//     //     modePathern.splice(-1, 1)
//     //   }
//     // }
  
//     return modePathern.sort((a, b) => a - b)
//   }, [mode, pentatonic, blueNote])
  
//   const mountMode = useCallback(({
//     currentStringIndex,
//   }: any) => {
//     const modePatthern = getModePattern();
//     return modePatthern.map((noteIndex) => {
//       const currentNoteIndex = getCurrentNoteIndex({
//         noteIndex,
//         currentStringIndex,
//       });
//       return getNoteName({ accidentals: accidental, indexOfList: currentNoteIndex });
//     });
//   }, [accidental])

//   const expose: Expose = {
//     instrument,
//     accidental,
//     numberOfFrets,
//     mode,
//     note,
//     noteHover,
//     pentatonic,
//     mountedMode,
//     mountedModeWithNames,

//     setInstrument,
//     setAccidental,
//     setNumberOfFrets,
//     setMode: handleMode,
//     setNote,
//     setNoteHover,
//     togglePentatonic,
//     toggleBlueNote,
//     getNoteIndex,
//     mountMode,

//   };
//   return (
//     <ConfigContext.Provider value={expose}>{children}</ConfigContext.Provider>
//   );
// };

// export const useConfig = () => {
//   const context = React.useContext(ConfigContext);

//   if (context === undefined) {
//     throw new Error("config must be used within a Provider");
//   }
//   return context;
// };
