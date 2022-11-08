import "./App.css";
import img1 from "./image/clouds-icon-design_24911-26673.webp";
import img2 from "./image/gettyimages-1386197903-crop-1652178745-1280x853.jpg";
import img3 from "./image/summer.webp";
import img4 from "./image/cold.jpg";
import img5 from "./image/weather-design-template-962e11d01ec181a494d784dd53448a2d_screen.jpg";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [contry, setContry] = useState("");
  const [temp, setTemp] = useState("");
  const [time, setTime] = useState("");
  const [Theame, setTheame] = useState(img1);
  const [Output, setOutput] = useState();
  const[display,setDisplay]=useState({display:"none"})
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    // Here i am fatching the data from api by using fatch method
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=$location=${input}`
    )
      .then((response) => response.json())
      .then((val) => setData(val));
    setTheame({ color: "red" });
  }, [input]);

  const SearchHandler = () => {
    setDisplay({display:"block"})
    console.log(input);
    // validation
    if (input === "") {
      alert("Please Enter your City Name");
    } else if (data.current.temp_c >= 0 && data.current.temp_c < 20) {
      setTheame(img4);
      setOutput("Cold");
    } else if (data.current.temp_c >= 21 && data.current.temp_c <= 25) {
      setOutput("spring");
      setTheame(img5);
    } else if (data.current.temp_c > 25 && data.current.temp_c < 30) {
      setOutput("Rainy");
      setTheame(img2);
    } else if (data.current.temp_c >= 30) {
      setOutput("Summer Days");
      setTheame(img3);
    }
    setName(data.location.name);
    setContry(data.location.country);
    setTime(data.location.localtime);
    setTemp(data.current.temp_c);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${Theame})` }}>
    
      <h2>Weather</h2>
      <div className="inputDiv" >
        <input
          type="text"
          name="input"
          value={input}
          placeholder="Enter city name"
          onChange={inputHandler}
        />
        <button onClick={SearchHandler}>Search</button>
      </div>
      <div className="weatherDiv" style={display}>
        Weather status is:
        <p>
          {name} {contry}
        </p>
        <p>{time}</p>
        <p>{temp} °C</p>
        <p>{Output}</p>
      </div>
    </div>
  );
}

export default App;
