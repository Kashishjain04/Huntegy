import React, { useState } from "react";

const NewForm2 = ({ submitGame }) => {
  const [hintQues, setHintQues] = useState(""),
    [hintAns, setHintAns] = useState(""),
    [hints, setHints] = useState([]),
    //eslint-disable-next-line
    [justRerender, rerender] = useState(true),
    [showForm, setShowForm] = useState(!hints.length);

  const addHint = (e) => {
    e.preventDefault();
    const obj = {
      hint: hintQues,
      answer: hintAns,
    };
    setHints((prev) => [...prev, obj]);
    setHintQues("");
    setHintAns("");
    setShowForm(!hints.length);
  };

  const removeHint = (index) => {
    const newHints = hints;
    newHints.splice(index, 1);
    setHints(newHints);
    rerender((prev) => !prev);
    setShowForm(!hints.length);
  };

  const hintForm = (
    <form
      autoComplete="off"
      onSubmit={addHint}
      className="space-y-5 flex flex-col border p-2"
    >
      <input
        autoComplete="false"
        name="hidden"
        type="text"
        className="hidden"
      />
      <div className="flex items-center space-x-3">
        <label htmlFor="hint" className="w-36">
          Hint:
        </label>
        <input
          name="hint"
          type="text"
          placeholder="Hint Question..."
          className="rounded-md flex-grow border p-2 focus:outline-none"
          required
          value={hintQues}
          onChange={(e) => setHintQues(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-3">
        <label htmlFor="hianswernt" className="w-36">
          Answer:
        </label>
        <input
          name="answer"
          type="text"
          minLength={5}
          maxLength={5}
          placeholder="Answer(5 letters)"
          className="rounded-md flex-grow border p-2 focus:outline-none"
          required
          value={hintAns}
          onChange={(e) => setHintAns(e.target.value)}
        />
      </div>
      <div className="flex justify-evenly">
        <button type="submit" className="focus:outline-none">
          Submit
        </button>
        <button
          className="focus:outline-none"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="w-full sm:max-w-xl mx-auto mt-7 sm:my-7 rounded-md bg-white sm:border sm:border-gray-300 p-5 space-y-3">
      {hints.map((hint, index) => (
        <div key={index} className="p-1 border rounded-md">
          <i
            className="bx bx-x w-max float-right cursor-pointer text-xl "
            onClick={() => removeHint(index)}
          />
          <div className="line-clamp-1">
            <strong>Hint:</strong> {hint.hint}
          </div>
          <p>
            <strong>Answer:</strong> {hint.answer}
          </p>
        </div>
      ))}
      {showForm ? (
        hintForm
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="border w-full p-1 rounded-md hover:shadow-sm space-x-3 focus:outline-none"
        >
          <i className="bx bx-plus" />
          <span>Add Hint</span>
        </button>
      )}
      <button
        onClick={() => submitGame(hints)}
        className="px-4 py-2 rounded-lg self-center border hover:shadow-md focus:outline-none"
      >
        Submit
      </button>
    </div>
  );
};

export default NewForm2;
