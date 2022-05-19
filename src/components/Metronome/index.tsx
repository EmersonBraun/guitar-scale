import React, { useCallback, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Column, Container } from "./style";
// @ts-ignore: Unreachable code error
import song from './clap.mp3';

function Metronome() {
  let timer: any = null
  const audio = new Audio(song)
  const [bpm, setBpm] = useState(40)
  const [isPlaying, setIsPlaying] = useState(false)

  const tick = () => {
    audio.play()
    console.log('tick', timer, isPlaying)
  }

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      clearInterval(timer)
      audio.pause()
    } else {
      tick()
      timer = setInterval(tick, (60 * 100) / bpm)
    }
    setIsPlaying(state => !state)
  }, [timer])

  const changeSpeed = useCallback((value) => {
    const currentBpm = parseInt(value)
    if (isPlaying) {
      clearInterval(timer)
      timer = setInterval(tick, (60 * 1000) / currentBpm)
    }
    setBpm(value)
  }, [])

  return (
    <Container>
      <Column>
        <h1>{bpm}bpm</h1><br/>
        <input type="range" min="40" max="300" step="1" value={bpm} onChange={(e) => changeSpeed(+e.target.value)}/>
        <Button colorScheme="teal" variant='solid' onClick={() => togglePlay()}>{isPlaying ? 'Stop' : 'Play'}</Button>
      </Column>
    </Container>
  );
}

export default Metronome;
