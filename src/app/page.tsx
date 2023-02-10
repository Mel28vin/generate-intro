"use client"
import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { AnimatePresence, motion } from "framer-motion"
import DropDown, { VibeType } from "@/components/DropDown"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LoadingDots from "@/components/LoadingDots"
import ResizablePanel from "@/components/ResizablePanel"

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [bio, setBio] = useState("")
  const [vibe, setVibe] = useState<VibeType>("Professional")
  const [generatedBios, setGeneratedBios] = useState<String>("")

  // console.log("Streamed response: ", generatedBios)

  const prompt =
    vibe === "Funny"
      ? `Generate 2 funny and catchy intros with no hashtags and clearly labeled "1." and "2.". Make sure there is a joke in there and it's a little ridiculous. Make sure each generated intro is at max 20 words and base it on this context: ${bio}${bio.slice(-1) === "." ? "" : "."
      }`
      : `Generate 2 ${vibe} catchy intros with no hashtags and clearly labeled "1." and "2.". Make sure each generated intro is at least 14 words and at max 20 words and base them on this context: ${bio}${bio.slice(-1) === "." ? "" : "."
      }`

  const generateBio = async (e: any) => {
    e.preventDefault()
    setGeneratedBios("")
    setLoading(true)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })
    console.log("Edge function returned.")

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedBios((prev) => prev + chunkValue)
    }

    setLoading(false)
  }
  return (
    <>
      <Header />
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center px-2 min-h-screen">
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-8 sm:mt-20">
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-gray-900">
            Generate catchy intros about you in moments
          </h1>
          <div className="max-w-xl w-full">
            <div className="flex mt-10 items-center space-x-3">
              <p>1. </p>
              <p className="text-left font-medium">
                Write a few sentences about yourself ;)
              </p>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 p-2"
              placeholder={
                "e.g. I'm a student, pursuing a four year bachelor's on Electronics and Communication Engineering. I like music and tech."
              }
            />
            <div className="flex mb-5 items-center space-x-3">
              <p>2. </p>
              <p className="text-left font-medium">
                Select the required vibe :)
              </p>
            </div>
            <div className="block">
              <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
            </div>

            {!loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                onClick={(e) => generateBio(e)}
              >
                Generate your intro &rarr;
              </button>
            )}
            {loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 2000 }}
          />
          <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
          <ResizablePanel>
            <AnimatePresence mode="wait">
              <motion.div className="space-y-10 my-10">
                {generatedBios && (
                  <>
                    <div>
                      <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                        Your catchy intros
                      </h2>
                    </div>
                    <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                      {generatedBios
                        .substring(generatedBios.indexOf("1") + 3)
                        .split("2.")
                        .map((generatedBio) => {
                          return (
                            <div
                              className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                              onClick={() => {
                                navigator.clipboard.writeText(generatedBio)
                                toast("Bio copied to clipboard", {
                                  icon: "✂️",
                                })
                              }}
                              key={generatedBio}
                            >
                              <p>{generatedBio}</p>
                            </div>
                          )
                        })}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Home
