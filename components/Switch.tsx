// "use client";
// import React from 'react';

// const Switch = ({ checked, onChange }) => {
//   return (
//     <div className="switch-wrapper">
//       <input 
//         type="checkbox" 
//         id="checkbox" 
//         checked={checked} 
//         onChange={onChange} 
//         className="switch-input"
//       />
//       <label htmlFor="checkbox" className="switch-label"> </label>

//       <style jsx>{`
//         .switch-wrapper {
//           display: flex;
//           align-items: center;
//           /* Prevents layout shift when hovering */
//           transform-style: preserve-3d;
//         }
        
//         .switch-input {
//           display: none;
//         }
        
//         .switch-label {
//           /* Automatically scales between 32px (mobile) and 40px (desktop) */
//           height: clamp(32px, 2.5vw, 40px); 
//           /* Automatically scales between 64px (mobile) and 80px (desktop) */
//           width: clamp(64px, 5vw, 80px); 
          
//           /* Dynamic background: White in Light mode, Dark Gray in Dark mode */
//           background-color: var(--card);
//           border-radius: 30px;
//           box-shadow: 
//             inset 0 0 5px 4px rgba(255, 255, 255, 0.5),
//             inset 0 0 15px 1px rgba(0, 0, 0, 0.2), 
//             4px 8px 12px rgba(0, 0, 0, 0.15),
//             inset 0 0 0 2px rgba(0, 0, 0, 0.2);
//           display: flex;
//           align-items: center;
//           cursor: pointer;
//           position: relative;
//           transition: transform 0.4s, background-color 0.3s;
//         }

//         .switch-label:hover {
//           transform: perspective(100px) rotateX(5deg) rotateY(-5deg);
//         }

//         .switch-input:checked ~ .switch-label:hover {
//           transform: perspective(100px) rotateX(-5deg) rotateY(5deg);
//         }

//         .switch-label::before {
//           position: absolute;
//           content: "";
//           /* Circle scales automatically with the switch */
//           height: clamp(24px, 1.8vw, 30px); 
//           width: clamp(24px, 1.8vw, 30px); 
//           border-radius: 50%;
//           background-color: #000000;
//           background-image: linear-gradient(130deg, #757272 10%, #ffffff 11%, #726f6f 62%);
//           left: 5px; 
//           box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3), 4px 4px 4px rgba(0, 0, 0, 0.3);
//           transition: 0.4s;
//         }

//         .switch-input:checked ~ .switch-label::before {
//           /* Automatically calculates slide distance based on width */
//           left: calc(100% - clamp(29px, 2.2vw, 35px)); 
//           background-color: #000000;
//           background-image: linear-gradient(315deg, #000000 0%, #414141 70%);
//           transition: 0.4s;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Switch;
"use client";

import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <div className="switch-wrapper">
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={onChange}
        className="switch-input"
      />

      <label htmlFor="checkbox" className="switch-label"></label>

      <style jsx>{`
        .switch-wrapper {
          display: flex;
          align-items: center;
          transform-style: preserve-3d;
        }

        .switch-input {
          display: none;
        }

        .switch-label {
          height: clamp(32px, 2.5vw, 40px);
          width: clamp(64px, 5vw, 80px);
          background-color: var(--card);
          border-radius: 30px;
          box-shadow:
            inset 0 0 5px 4px rgba(255, 255, 255, 0.5),
            inset 0 0 15px 1px rgba(0, 0, 0, 0.2),
            4px 8px 12px rgba(0, 0, 0, 0.15),
            inset 0 0 0 2px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.4s, background-color 0.3s;
        }

        .switch-label:hover {
          transform: perspective(100px) rotateX(5deg) rotateY(-5deg);
        }

        .switch-input:checked ~ .switch-label:hover {
          transform: perspective(100px) rotateX(-5deg) rotateY(5deg);
        }

        .switch-label::before {
          position: absolute;
          content: "";
          height: clamp(24px, 1.8vw, 30px);
          width: clamp(24px, 1.8vw, 30px);
          border-radius: 50%;
          background-color: #000;
          background-image: linear-gradient(
            130deg,
            #757272 10%,
            #ffffff 11%,
            #726f6f 62%
          );
          left: 5px;
          box-shadow:
            0 2px 1px rgba(0, 0, 0, 0.3),
            4px 4px 4px rgba(0, 0, 0, 0.3);
          transition: 0.4s;
        }

        .switch-input:checked ~ .switch-label::before {
          left: calc(100% - clamp(29px, 2.2vw, 35px));
          background-color: #000;
          background-image: linear-gradient(
            315deg,
            #000000 0%,
            #414141 70%
          );
        }
      `}</style>
    </div>
  );
};

export default Switch;