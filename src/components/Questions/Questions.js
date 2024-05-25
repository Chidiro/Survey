"use client";
import React, { useId, useState } from "react";

const choices = [
  "Kesinlikle Katılıyorum",
  "Katılmıyorum",
  "Ne Katılıyorum Ne Katılmıyorum",
  "Katılıyorum",
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
      <div className="flex flex-row gap-6 justify-between px-4 py-6 bg-gray-50">
        {choices.map((choice, i) => (
          <div key={`${unique}-${i}`} className="flex gap-2">
            <label htmlFor={`${unique}-${i}`}>{choices[i]}</label>
            <input
              type="radio"
              id={`${unique}-${i}`}
              value={choices[i]}
              name={`question-${index + 1}`}
              checked={state == choice}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;