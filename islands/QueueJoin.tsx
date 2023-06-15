import { useEffect, useState } from "preact/hooks";

export default function QueueJoin() {
  const [queueJoined, setQueueJoined] = useState(false);
  const [match, setMatch] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [matches, setMatches] = useState([] as number[]);
  const [matchesIndex, setMatchesIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/get-matches`)
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
        //   console.log(data);
        //set a timer for when the first match will start
        const now = Date.now();
        // get the first match in the future
        let firstMatch = data[0];
        for (let i = 0; i < data.length; i++) {
          if (data[i] > now) {
            firstMatch = data[i];
            break;
          }
        }
        // set the timer
        const timer = setInterval(() => {
          const now = Date.now();
          if (firstMatch > now) {
            setCountdown(Math.round((firstMatch - now) / 1000));
          } else {
            setMatch(firstMatch);
          }
        });
      })
      .catch((_error) => {
        console.log("error");
      });
  }, [matchesIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now > matches[matchesIndex]) {
        setMatchesIndex(matchesIndex + 1);
        if (queueJoined) {
          // go to game
          window.location.href = `/${matches[matchesIndex]}`;
        } else {
          //TODO: do api get-matches
        }
      } else {
        setCountdown(Math.round((matches[matchesIndex] - now) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, matches, matchesIndex, queueJoined]);

  return (
    <>
      <div>
        <div class="flex justify-center text-2xl text-blue-800 font-bold ">
          <p>Next match in: {countdown}</p>
        </div>
        <button
          class={`px-3 py-2 text-xl text-gray-50 rounded m-5 h-20 w-60 ${
            queueJoined
              ? "bg-blue-400 opacity-50 cursor-not-allowed"
              : "bg-blue-800 hover:bg-blue-500"
          }`}
          disabled={queueJoined}
          onClick={() => setQueueJoined(true)}
        >
          {queueJoined ? "Be ready!" : "Join Queue"}
        </button>
      </div>
    </>
  );
}
