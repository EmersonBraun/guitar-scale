import { writeFileSync } from 'fs'
import { DEGREES_INDEX } from './degrees.js'
import { MODES_DEFINITIONS } from './modeDefinitions.js'

function getDefaultScale(degrees) {
    return degrees.map(degree => DEGREES_INDEX[degree])
}

function getPentatonicScale(scale) {
    return scale.filter(degree => degree.pentatonic)
}

function addBlueNote(scale) {
    const { CHOMATIC: { degrees } } = MODES_DEFINITIONS
    const defaultScale = getDefaultScale(degrees)

    const blueNotes = defaultScale.filter(degree => degree.blueNote)
    const blueNoteToAdd = blueNotes.filter(b => scale.find(s => {
        if(s.blueNote) {
            return s.index !== b.index
        }
    }))

    return [...scale, ...blueNoteToAdd].sort((a, b) => a.index - b.index)
}

function getIndexes(scale) {
    return scale.map(s => s.index)
}

function mapDegrees(degrees) {
    const defaultScale = getDefaultScale(degrees)
    const pentatonicScale = getPentatonicScale(defaultScale)

    return {
        default: {
            scale: defaultScale,
            indexes: getIndexes(defaultScale)
        },
        pentatonic: {
            scale: pentatonicScale,
            indexes: getIndexes(defaultScale)
        },
        'default-blueNote': {
            scale: addBlueNote(defaultScale),
            indexes: getIndexes(addBlueNote(defaultScale))
        },
        'pentatonic-blueNote': {
            scale: addBlueNote(pentatonicScale),
            indexes: getIndexes(addBlueNote(pentatonicScale))
        }
    }
}
export function generateModes() {
    const data = []
    Object.entries(MODES_DEFINITIONS).forEach(([name, definitions]) => {
        const { degrees, description = '', sound = '' } = definitions
        console.log({ degrees, description, sound })
        const getIndexes = mapDegrees(degrees)

        data.push({
            name,
            scales: getIndexes,
            degrees,
            description,
            sound
        })
    })

    const json = JSON.stringify(data, null, 2)
    console.log(json)
    writeFileSync(`modes.json`, json)
}

generateModes()
