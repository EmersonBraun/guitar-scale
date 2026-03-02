let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function playNote(frequency: number, duration = 0.5) {
  const ctx = getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(frequency, ctx.currentTime)

  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

export function playSequence(frequencies: number[], interval = 0.3): Promise<void> {
  return new Promise(resolve => {
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        playNote(freq, 0.4)
        if (i === frequencies.length - 1) {
          setTimeout(resolve, 400)
        }
      }, i * interval * 1000)
    })
  })
}

export function playMetronomeClick(accent = false) {
  const ctx = getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(accent ? 1000 : 800, ctx.currentTime)

  gain.gain.setValueAtTime(accent ? 0.5 : 0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.05)
}

// Web MIDI API
export async function getMidiAccess(): Promise<MIDIAccess | null> {
  if (!navigator.requestMIDIAccess) return null
  try {
    return await navigator.requestMIDIAccess()
  } catch {
    return null
  }
}

export function sendMidiNote(output: MIDIOutput, noteNumber: number, velocity = 100, duration = 500) {
  output.send([0x90, noteNumber, velocity])
  setTimeout(() => {
    output.send([0x80, noteNumber, 0])
  }, duration)
}

export function noteToMidi(noteIndex: number, octave: number): number {
  return 12 * (octave + 1) + noteIndex
}
