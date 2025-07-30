import fs from "fs-extra"
import { fileURLToPath } from "url";
import path,{dirname} from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const segmentText = (text : string) : string[] => {
    return text
        .split(/(?<=[.!?])\s+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);
}

const loadText = async ()  : Promise<string[]> => {
    const filePath = path.join(__dirname, "Google_TermsofService.txt");
    const text : string = await fs.readFile(filePath, {encoding : "utf-8"});
    const segmentedText : string[] = segmentText(text)
    return segmentedText
};

// Wrap in async function to avoid top-level await
const initializeText = async () => {
    const text = await loadText()
    console.log(text)
    return text
}

export default initializeText