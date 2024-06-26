"use client";
import React, { useId, useState } from "react";

const options = [1, 2, 3, 4];

const choices = [
  "Kesinlikle Katılıyorum",
  "Katılıyorum",
  "Ne Katılıyorum Ne Katılmıyorum",
  "Katılmıyorum",
  "Kesinlikle Katılmıyorum",
];
function Questions({ chidren, question, index, fontStyle }) {
  const [state, setState] = useState("");
  const unique = useId();
  return (
    <div className="border-l-slate-700 border-t-slate-700 border-4 rounded-se-xl rounded-ee-xl bg-gray-100">
      <h2
        className={
          fontStyle.className +
          " pt-5 pb-10 px-4 rounded-se-xl border-b-slate-500 border-b-2"
        }
      >
        {question}
      </h2>
      <div className="flex flex-col gap-6 justify-start px-4 py-6 bg-gray-50">
        {choices.map((choice, i) => {
          if (index < 2 && i >= 4) {
            return;
          }
          return (
            <div key={`${unique}-${i}`} className="flex gap-2">
              <label htmlFor={`${unique}-${i}`}>
                {index == 0 || index == 1 ? options[i] : choices[i]}
              </label>
              <input
                type="radio"
                id={`${unique}-${i}`}
                value={index == 0 || index == 1 ? options[i] : choices[i]}
                name={`question-${index + 1}`}
                checked={
                  index == 0 || index == 1
                    ? state == options[i]
                    : state == choice
                }
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
