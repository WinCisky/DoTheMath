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
      `/api/submit-solutions?uuid=${uuid}&id=${props.id}&solutions=${props.solution}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.win){
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
      <div>
        <h1>{result}</h1>
        <Button onClick={() => (window.location.href = "/")}>
            Continue
        </Button>
      </div>
    </>
  );
}
