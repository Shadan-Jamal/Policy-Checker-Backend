import express,{ Response, Request } from "express"
import cors from "cors"
import TextClassificationPipeline from "./pipeline/TextClassificationPipeline"
import initializeText from "./data/text"

type Results = Array<{
    label: string;
    score: number;
    text: string;
}>

const app = express()
const port = 3000

app.use(cors())

const classifyText = async () => {
    const classifier = await TextClassificationPipeline.getInstance()
    const terms = await initializeText()
    let results : Results = [{}]
    for(let term of terms){
        const labeledTerm = await classifier(term)
        results.push({...labeledTerm, text : term})
    }
    console.log(results)
    // console.table(JSON.stringify())
}

classifyText()


app.listen(port , () => {
    console.log(`Listening on port http://localhost:${port}`)
})