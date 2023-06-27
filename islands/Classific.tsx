import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

export default function Classific() {
  const [result, setResult] = useState("");
  const [classifc, setClassific] = useState(
    [] as { victories: number; user: string; name?: string }[],
  );

  useEffect(() => {
    const uuid = localStorage.getItem("uuid");
    if (!uuid) {
      return;
    }
    fetch(
      `/api/classific`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClassific(data);
      })
      .catch((_error) => {
        setResult("You Lost! All answers must be correct!");
      });
  }, []);

  return (
    <>
      <div class="bg-green-300 h-screen">
        <div className="flex flex-col items-center justify-center pt-20">
          <h1 className="text-4xl font-bold text-blue-800">Classific</h1>
          <div className="mt-10">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {classifc.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {item.name || item.user}
                    </td>
                    <td className="px-4 py-2 flex justify-center">{item.victories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <Button
              className="inline-block cursor-pointer px-3 py-2 bg-blue-800 text-xl text-gray-50 rounded hover:bg-blue-500"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
