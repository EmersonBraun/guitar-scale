export const MODES_DEFINITIONS = {
    CHOMATIC: {
      degrees: ["I", "II♭", "II", "III♭", "III", "IV", "V♭", "V", "VI♭", "VI", "VII♭", "VII"],
      description: `All notes`,
      sound: "normal"
    },
    IONIAN: {
      degrees: ["I", "II", "III", "IV", "V", "VI", "VII"],
      description: `The ionian mode is the same as the major scale. In other words, it's the major scale, unmodified.`,
      sound: "normal",
    },
    DORIAN: {
      degrees: ["I", "II", "III♭", "IV", "V", "VI", "VII♭"],
      description: `From the major scale, the dorian mode is created by flattening the 3rd and flattening the 7th. Or, just like the natural minor scale, but with a raised 'VI',th scale degree`,
      sound: `minor sounding; Smooth/Jazzy`,
    },
    PHRYGIAN: {
      degrees: ["I", "II♭", "III♭", "IV", "V", "VI♭", "VII♭"],
      description: `From the major scale, the phrygian mode is created by flattening the 2nd, 3rd, 'VI',th and 7th. Or, just like the natural minor scale, but with a flattening 2nd scale degree.`,
      sound: `minor sounding; Eastern/Spanish/Latin`,
    },
    LYDIAN: {
      degrees: ["I", "II", "III", "IV#", "V", "VI", "VII"],
      description: `From the major scale, the lydian mode is created by raising the 4th scale degree.`,
      sound: `major sounding; Dreamy/Ethereal`,
    },
    MIXOLYDIAN: {
      degrees: ["I", "II", "III", "IV", "V", "VI", "VII♭"],
      description: `From the major scale, the mixolydian mode is created by flattening the 7th scale degree.`,
      sound: `major sounding; Smooth/Bluesy`,
    },
    AEOLIAN: {
      degrees: ["I", "II", "III♭", "IV", "V", "VI♭", "VII♭"],
      description: `The aeolian mode is the same as the minor scale. It's obtained from the major scale by flattening the 3rd, 'VI',th and 7th scale degrees.`,
      sound: `minor sounding; Sad`,
    },
    LOCRIAN: {
      degrees: ["I", "II♭", "III♭", "IV", "V♭", "VI♭", "VII♭"],
      description: `From the major scale, the locrian mode is created by flattening the 2nd, 3rd, 5th, 'VI',th and 7th scale degrees. Or, starting from the minor scale, the locrian is obtained by flattening the 2nd and 5th scale degrees.`,
      sound: `diminished sounding; Unresolved/Strange`,
    },
  };