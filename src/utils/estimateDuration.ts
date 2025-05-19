import { Script } from '../types/inferred'

const estimateDuration = (script: Script) => {
    const expectedWPM = 140; // can be adjusted or possibly dynamic? especially with info on the models generating audio

    let duration = 0;
    for (const statement of script.lines) {
        const nWords = statement.text.split(' ').length;
        duration += nWords/expectedWPM;
    }

    return duration * 60;
}

export default estimateDuration;