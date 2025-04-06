export const TextSplitter = (
  { text, className }: { text: string; className?: string },
) => {
  // Split the text into an array of sentences based on the period (.)
  const sentences = text.split(".").filter((sentence) =>
    sentence.trim() !== ""
  );

  return (
    <div className={className}>
      {sentences.map((sentence, index) => <p key={index}>{sentence.trim()}.
      </p>)}
    </div>
  );
};
