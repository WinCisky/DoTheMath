import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { Problem } from "../routes/api/get-matches.ts";
import { Solution } from "../routes/api/submit-solutions.ts";

interface CounterProps {
  id: string;
}

export default function Game(props: CounterProps) {
  const id = props.id;
  const [problems, setProblems] = useState<Problem[]>([]);
  const [question, setQuestion] = useState(-1);
  const [description, setDescription] = useState("");
  const [btn1, setBtn1] = useState("");
  const [btn2, setBtn2] = useState("");
  const [btn3, setBtn3] = useState("");
  const [btn4, setBtn4] = useState("");
  const [solution, setSolution] = useState([] as Solution[]);

  function handleData(data: any) {
    if (data.value && data.value != "") {
      const dataValue = JSON.parse(data.value);
      setProblems(dataValue.problems);
      setQuestion(0);
    }
  }

  useEffect(() => {
    fetch(`/api/get-match?id=${id}`)
      .then((response) => response.json())
      .then((data) => handleData(data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    if (question >= problems.length) {
      console.log("end of game");
      const encoded = encodeURI(btoa(JSON.stringify(solution)));
      window.location.href = `/result?solution=${encoded}`;
    }

    //get problem with id question
    const problem = problems.find((problem) => problem.id == question);
    if (!problem) return;
    setDescription(problem.description);
    setBtn1(problem.choices[0]);
    setBtn2(problem.choices[1]);
    setBtn3(problem.choices[2]);
    setBtn4(problem.choices[3]);
  }, [question, problems]); // Add question as a dependency

  return (
    <div>
      <p>{description}</p>
      <Button
        onClick={() => {
          solution.push({ id: question, solution: btn1 });
          setSolution(solution);
          setQuestion(question + 1);
        }}
      >
        {btn1}
      </Button>
      <Button
        onClick={() => {
          solution.push({ id: question, solution: btn2 });
          setSolution(solution);
          setQuestion(question + 1);
        }}
      >
        {btn2}
      </Button>
      <Button
        onClick={() => {
          solution.push({ id: question, solution: btn3 });
          setSolution(solution);
          setQuestion(question + 1);
        }}
      >
        {btn3}
      </Button>
      <Button
        onClick={() => {
          solution.push({ id: question, solution: btn4 });
          setSolution(solution);
          setQuestion(question + 1);
        }}
      >
        {btn4}
      </Button>
    </div>
  );
}
