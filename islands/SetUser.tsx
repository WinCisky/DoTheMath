import { useEffect } from "preact/hooks";

export default function SetUser() {

    useEffect(() => {
        console.log(localStorage.getItem("uuid"));
        if (localStorage.getItem("uuid") === null) {
            console.log("uuid not found");
            fetch(`/api/random-uuid`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("uuid", data);
                })
                .catch((error) => console.error(error));
        }
    }, []);

    return (
        <>
        </>
    );
}