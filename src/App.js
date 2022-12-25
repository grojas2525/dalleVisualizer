import { useState } from "react";

import { Configuration, OpenAIApi } from "openai";

import "./App.css";

//console.log(process.env.REACT_APP_OPENAI_API_KEY)
//const API_KEY =`${process.env.REACT_APP_OPENAI_API_KEY}`

function App() {
  //console.log(process.env);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
  );
  const configuration = new Configuration({
    //apiKey: import.meta.env.OPENAI_API_KEY,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    //OPENAI_API_KEY: import.meta.env.REACT_APP_OPENAI_API_KEY

  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Please Wait..</h2>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
      <>
        <h2>Generate an Image using text input. Built with Open AI's Dall-E API</h2>

        <textarea
          className="app-input"
          placeholder="Search for anything..."
          onChange={(e) => setPrompt(e.target.value)}
          rows="10"
          cols="40"
        />
        <button onClick={generateImage}>Generate a new image</button>
        {result.length > 0 ? (
          <img className="result-image" src={result} alt="result" />
          //<>text className="prompt" src={prompt} alt="prompt" </>
        ) : (
          <></>
        )}
      </>
    )}
    </div>
  );
}

export default App;