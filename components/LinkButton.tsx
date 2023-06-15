import { JSX } from "preact";

export default function LinkButton(
  props: JSX.HTMLAttributes<HTMLAnchorElement>
) {
  return (
    <a
      href="/game"
      {...props}
      class={`inline-block cursor-pointer px-3 py-2 bg-blue-800 text-xl text-gray-50 rounded hover:bg-blue-500 ${
        props.class ?? ""
      }`}
    />
  );
}
