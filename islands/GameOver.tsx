import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

export interface GameOverProps {
  id: string;
  solution: string;
}

export default function GameOver(props: GameOverProps) {
  const [result, setResult] = useState("");

  useEffect(() => {
    const uuid = localStorage.getItem("uuid");
    if (!uuid) {
      return;
    }
    fetch(
      `/api/submit-solutions?uuid=${uuid}&id=${props.id}&solutions=${props.solution}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.win) {
          setResult("You Won!");
        } else {
          setResult("You Lost! Someone was faster than you!");
        }
      })
      .catch((_error) => {
        setResult("You Lost! All answers must be correct!");
      });
  }, []);

  return (
    <>
      <div class="bg-blue-400 h-screen">
        <div class="flex justify-center pt-20 text-4xl text-blue-800 font-bold">
          <h1>{result}</h1>
        </div>
        <div class="flex justify-center pt-20">
          <Button
            class=" inline-block cursor-pointer px-3 py-2 bg-blue-800 text-xl text-gray-50 rounded hover:bg-blue-500"
            onClick={() => (window.location.href = "/")}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
