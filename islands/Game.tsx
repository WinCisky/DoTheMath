import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { Problem } from "../routes/api/get-matches.ts";

interface CounterProps {
  id: string;
}

export default function Game(props: CounterProps) {
    const id = props.id;
    let problems: Problem[] = [];
    let question = 0;
    const [description, setDescription] = useState("");
    const [btn1, setBtn1] = useState("");
    const [btn2, setBtn2] = useState("");
    const [btn3, setBtn3] = useState("");
    const [btn4, setBtn4] = useState("");

    function handleData(data: any){
        if (data.value && data.value != ""){
            const dataValue = JSON.parse(data.value);
            problems = dataValue.problems;
            setQuestion(0);
        }
    }

    function setQuestion(id: number){
        console.log(problems);
        setDescription(problems[id].description);
        setBtn1(problems[id].choices[0]);
        setBtn2(problems[id].choices[1]);
        setBtn3(problems[id].choices[2]);
        setBtn4(problems[id].choices[3]);
    }

    useEffect(() => {
        fetch(`/api/get-match?id=${id}`)
          .then((response) => response.json())
          .then((data) => handleData(data))
          .catch((error) => console.error(error));
      }, [id]);

    return (
        <div>
            <p>{description}</p>
            <Button onClick={() => console.log('1')}>{btn1}</Button>
            <Button onClick={() => console.log('2')}>{btn2}</Button>
            <Button onClick={() => console.log('3')}>{btn3}</Button>
            <Button onClick={() => console.log('4')}>{btn4}</Button>
        </div>
    );
}
