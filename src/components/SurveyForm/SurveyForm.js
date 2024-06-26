"use client";

import React, { useRef, useState } from "react";
import Questions from "../Questions";
import { Merriweather } from "next/font/google";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: "700",
});

function SurveyForm({ children, questions }) {
  const [status, setStatus] = useState("idle");
  const formRef = useRef();
  const router = useRouter();
  return (
    <form
      ref={formRef}
      className="flex flex-col gap-10 text-xl border-black rounded-md mt-8 p-6"
      onSubmit={async (e) => {
        try {
          e.preventDefault();
          const formData = new FormData(formRef.current);
          const selectedValues = {};
          formData.forEach((key, value) => {
            selectedValues[value] = key;
          });

          const response = await fetch("/api/submit-survey", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedValues }),
          });

          const text = await response.json();
          console.log(text);

          if (!response.ok) {
            throw new Error(text.error);
            console.log("Server Response:", response.message);
          }

          router.push("/success");
        } catch (error) {
          toast.error(error.message);
          console.error("error", error);
        }
      }}
    >
      {questions.map((quest, i) => {
        if (i == 1) {
          return;
        }
        return (
          <Questions
            key={i}
            question={quest}
            index={i}
            fontStyle={merriweather}
          />
        );
      })}
      <button className="mr-auto bg-slate-700 px-10 py-3 rounded-2xl text-slate-100 hover:bg-slate-500">
        Onayla
      </button>
      <Toaster position="top center" />
    </form>
  );
}

export default SurveyForm;
