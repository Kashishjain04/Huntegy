import React from "react";

const NewForm1 = ({
  name,
  setName,
  setExist,
  exist,
  teams,
  setTeams,
  setShuffle,
  dbGames,
  setFormShown,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < dbGames?.length; i++) {
      if (dbGames[i]?.name === name) {
        return setExist(true);
      }
    }
    setFormShown(2);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className="w-full sm:max-w-xl mx-auto mt-7 sm:my-7 rounded-md bg-white sm:border sm:border-gray-300 p-5 space-y-10 flex flex-col"
    >
      <input
        autoComplete="false"
        name="hidden"
        type="text"
        className="hidden"
        defaultValue={name}
      />
      <div className="flex items-center space-x-3">
        <label htmlFor="name" className="w-36">
          Game Name:
        </label>
        <div className="flex-grow">
          <div>
            <input
              name="name"
              type="text"
              placeholder="Game-1..."
              maxLength={20}
              className="rounded-md w-full border p-2 focus:outline-none"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setExist(false);
              }}
            />
            <p className="text-sm">{name.length}/20</p>
          </div>
          {exist && (
            <div className="text-sm text-red-500 absolute">
              {name} already exists
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <label htmlFor="teams" className="w-36">
          Number of Teams:
        </label>
        <input
          name="teams"
          min="2"
          type="number"
          placeholder="minimum 2"
          className="rounded-md flex-grow border p-2 focus:outline-none"
          required
          value={teams}
          onChange={(e) => setTeams(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-3">
        <label htmlFor="teams" className="w-36">
          Shuffle Hints:
        </label>
        <input
          type="radio"
          id="yes"
          name="shuffle"
          value="yes"
          className="cursor-pointer"
          required
          onChange={() => setShuffle(true)}
        />
        <label htmlFor="yes" className="cursor-pointer">
          Yes
        </label>
        <input
          type="radio"
          id="no"
          name="shuffle"
          value="no"
          className="cursor-pointer"
          onChange={() => setShuffle(false)}
        />
        <label htmlFor="no" className="cursor-pointer">
          No
        </label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-lg self-center border hover:shadow-md focus:outline-none"
      >
        Next
      </button>
    </form>
  );
};

export default NewForm1;
