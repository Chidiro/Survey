"use client";

import NestedModal from "@/components/Modal/Modal";
import { useState, useEffect } from "react";

export default function Results({ children }) {
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-results");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResponses(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const responsesObj = {};
  const questions = {
    "Kesinlikle Katılıyorum": 0,
    Katılıyorum: 0,
    "Ne Katılıyorum Ne Katılmıyorum": 0,
    Katılmıyorum: 0,
    "Kesinlikle Katılmıyorum": 0,
  };

  responses.forEach((response) => {
    questions[response.answer_choice]++;
  });
  responses.forEach((response, i) => {
    if (response.participant_id == responses[i - 1]?.participant_id) {
      if (!responsesObj[response.participant_id])
        [(responsesObj[response.participant_id] = [])];
      responsesObj[response.participant_id].push(response);
    } else {
      responsesObj[response.participant_id] = [];
      responsesObj[response.participant_id].push(response);
    }
  });
  const participantArray = Array.from(
    { length: Object.keys(responsesObj).length },
    (el, i) => i + 1
  );
  console.log(responses);
  return (
    <div className="flex w-full h-max justify-center mt-5 mx-3">
      <div className="flex-col w-full border-2 border-black p-1 mx-3">
        <NestedModal
          responsesObj={responsesObj}
          participantArray={participantArray}
        />
        <div className="">
          <div className="my-5">
            {"Toplam katılımcı: " + Object.keys(responsesObj).length}
          </div>
        </div>
        {Object.entries(questions).map(([quest, count], i) => (
          <div
            key={i}
            className="flex justify-between border-2 border-black p-2"
          >
            <div className="">{quest}: </div>
            <div className="">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
