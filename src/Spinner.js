const { useState } = require("react");

function Spinner({ filepath }) {
  const [isLoading,] = useState(true);

  return <div>{isLoading && <img src={`${filepath}spinner.svg`} alt="Spinner" className="w-8 bg-gray-100" />}</div>;
}

export default Spinner
