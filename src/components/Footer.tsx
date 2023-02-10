const Footer = () => {
  return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-4 pt-4 border-t mt-5 items-center px-3 mb-3 sm:mb-0">
      <div>
        Powered by{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          Vercel Edge Functions{" "}
        </a>
        and{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          OpenAI.
        </a>
      </div>
    </footer>
  )
}
export default Footer
