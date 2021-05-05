import React from "react";
import treasure from "../../assets/treasure.jpeg";

const Hint = ({ hint, submitHint, ans, setAns }) => {
  return (
    <div
      style={{
        background: `url(${treasure}) 0% 0% / cover #008080`,
        backgroundPosition: "center",
        backgroundBlendMode: "screen",
      }}
      className="bg-white w-full flex-grow flex flex-col items-center justify-center space-y-10 sm:max-w-xl mx-auto  sm:my-7 rounded-md sm:border sm:border-gray-300 p-5"
    >
      <h1 className="hint-text font-semibold text-center text-3xl sm:text-4xl break-all">
        {hint?.hint}
      </h1>
      <form onSubmit={submitHint} autoComplete="off" className="w-full">
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          className="hidden"
        />
        <input
          name="ans"
          type="text"
          placeholder="Answer here..."
          className="rounded-md flex-grow border p-2 focus:outline-none w-full text-center"
          required
          value={ans}
          onChange={(e) => setAns(e.target.value)}
        />
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Hint;
