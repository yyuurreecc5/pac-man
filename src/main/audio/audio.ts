export namespace Audio {
  let audioContext: AudioContext | null = null;
  export function getContext(): AudioContext {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    return audioContext;
  }

  export async function getFile(filepath: string): Promise<AudioBuffer> {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await getContext().decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  export async function loadFile(filePath: string): Promise<AudioBuffer> {
    const track = await getFile(filePath);
    return track;
  }

  let offset = 0;
  export function playTrack(audioBuffer: AudioBuffer): AudioBufferSourceNode {
    const trackSource = getContext().createBufferSource();
    trackSource.buffer = audioBuffer;
    trackSource.connect(getContext().destination);

    if (offset === 0) {
      trackSource.start();
      offset = getContext().currentTime;
    } else {
      trackSource.start(0, getContext().currentTime - offset);
    }

    return trackSource;
  }
}
