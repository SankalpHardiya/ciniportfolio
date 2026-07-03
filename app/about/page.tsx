// "use client";

// import { useEffect, useRef, useState } from "react";

// type TypeWriterProps = {
//   text: string;
//   speed?: number;
//   onComplete?: () => void;
// };

// function TypeWriter({
//   text,
//   speed = 20,
//   onComplete,
// }: TypeWriterProps) {
//   const [displayed, setDisplayed] = useState("");

//   useEffect(() => {
//     let index = 0;

//     const interval = setInterval(() => {
//       index++;

//       setDisplayed(text.slice(0, index));

//       if (index >= text.length) {
//         clearInterval(interval);

//         setTimeout(() => {
//           onComplete?.();
//         }, 250);
//       }
//     }, speed);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       {displayed}
//       <span className="animate-pulse text-neutral-400">|</span>
//     </>
//   );
// }

// export default function AboutSection() {
//   const [currentLine, setCurrentLine] = useState(0);

//  const aboutText = [
//   "I'm Sankalp Hardiya, an AI & Full-Stack Developer passionate about building products that combine intelligence, performance, and elegant design.",

//   "I enjoy transforming complex ideas into seamless digital experiences using modern technologies, thoughtful engineering, and a relentless focus on quality.",
// ];
//   return (
//     <section className="w-full px-12 xl:px-24 py-28 flex justify-center">
//       <div className="w-full max-w-[1700px]">

//         <div className="space-y-16">

//           {aboutText.map((paragraph, index) => {
//             const line = String(index + 1).padStart(2, "0");

//             return (
//               <div
//                 key={index}
//                 className="grid grid-cols-[70px_1fr_70px] gap-6 items-start"
//               >
//                 {/* Left Number */}
//                 <div className="pt-4 text-right font-mono text-neutral-400">
//                   {line}
//                 </div>

//                 {/* Text */}
//                 <div className="text-center font-[family-name:var(--font-bebas)] text-[3rem] leading-[1.05]">
//                   {index < currentLine ? (
//                     paragraph
//                   ) : index === currentLine ? (
//                     <TypeWriter
//                       text={paragraph}
//                       speed={15}
//                       onComplete={() => {
//                         setCurrentLine((prev) => prev + 1);
//                       }}
//                     />
//                   ) : null}
//                 </div>

//                 {/* Right Number */}
//                 <div className="pt-4 text-left font-mono text-neutral-400">
//                   {line}
//                 </div>
//               </div>
//             );
//           })}

//         </div>

//         {currentLine >= aboutText.length && (
//           <div className="mt-20 flex flex-col items-center gap-3 font-mono">
            

          
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }   
//ORIGINNALL

"use client";

import { useEffect, useState } from "react";

type TypeWriterProps = {
  text: string;
  speed?: number;
  onComplete?: () => void;
};

function TypeWriter({
  text,
  speed = 20,
  onComplete,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 250);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {displayed}
      <span className="animate-pulse text-muted-foreground">|</span>
    </>
  );
}

export default function AboutSection() {
  const [currentLine, setCurrentLine] = useState(0);

  const aboutText = [
    "I'm Sankalp Hardiya, an AI & Full-Stack Developer passionate about building products that combine intelligence, performance, and elegant design.",
    "I enjoy transforming complex ideas into seamless digital experiences using modern technologies, thoughtful engineering, and a relentless focus on quality.",
  ];

  return (
    <section className="w-full px-6 sm:px-12 xl:px-24 py-16 sm:py-24 lg:py-28 flex justify-center bg-background transition-colors duration-300">
      <div className="w-full max-w-[1700px]">
        <div className="space-y-12 sm:space-y-16">
          {aboutText.map((paragraph, index) => {
            return (
              <div
                key={index}
                // CHANGED: Simplified to a single column layout taking full width
                className="grid grid-cols-1 gap-4 sm:gap-6 items-start"
              >
                {/* Text Only - Centered on all devices */}
                <div className="text-center font-[family-name:var(--font-bebas)] text-2xl sm:text-4xl lg:text-[3rem] leading-[1.1] sm:leading-[1.05] text-foreground">
                  {index < currentLine ? (
                    paragraph
                  ) : index === currentLine ? (
                    <TypeWriter
                      text={paragraph}
                      speed={15}
                      onComplete={() => {
                        setCurrentLine((prev) => prev + 1);
                      }}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {currentLine >= aboutText.length && (
          <div className="mt-16 sm:mt-20 flex flex-col items-center gap-3 font-mono">
            {/* You can add anything here that shows up after typing is done */}
          </div>
        )}
      </div>
    </section>
  );
}