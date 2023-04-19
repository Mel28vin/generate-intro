import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const config = {
  runtime: "edge",
}

const handler = async (req: Request): Promise<Response> => {
  // console.log("Handler")
  const { prompt } = (await req.json()) as {
    prompt?: string
  }

  if (!prompt) {
    console.log("No prompt")
    return new Response("No prompt in the request", { status: 400 })
  }

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  }
  console.log("0Handler")

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}

export default handler
