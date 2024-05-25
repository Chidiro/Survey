"use client";

import React, { useRef, useState } from "react";
import Questions from "../Questions";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: "700",
});

const ENDPOİNT = "http://localhost:3000/api/submit-survey";

function SurveyForm({ children, questions }) {
  const [status, setStatus] = useState("idle");
  const formRef = useRef();

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-10 text-xl border-black rounded-md mt-8 p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const selectedValues = {};
        formData.forEach((value, key) => {
          selectedValues[value] = key;
        });

        const result = await fetch(ENDPOİNT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
      }}
    >
      {questions.map((quest, i) => (
        <Questions
          key={i}
          question={quest}
          index={i}
          fontStyle={merriweather}
        />
      ))}
      <button className="mr-auto bg-slate-700 px-10 py-3 rounded-2xl text-slate-100 hover:bg-slate-500">
        Onayla
      </button>
    </form>
  );
}

export default SurveyForm;
