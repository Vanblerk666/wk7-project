import { useState, useEffect } from "react";

export default function App() {
  // set state variable and change function for contributors
  const [contributors, setContributors] = useState([]);

  // calls the getContributors function on page load and when there is a change of state
  useEffect(() => {
    getContributors();
  }, []);

  // function sends contributors to port 8080
  async function getContributors() {
    const response = await fetch("http://localhost:8080/addrecipe");

    // turns data into a json object
    const data = await response.json();

    // updates contributors with new data
    setContributors(data);
  }
  return (
    //gets first and surnames for all contributors and puts them in an H2

    <div>
      <h1>Ferment Frenzy</h1>
      {contributors.map((contributor) => {
        return (
          <div key={contributor.id + contributor.firstname}>
            <h2>
              {contributor.firstname} {contributor.surname}
            </h2>
            {/* <ul>
              {recipes.map((recipe) => {
                return <li key={recipe}>{recipe}</li>;
              })}
            </ul> */}
          </div>
        );
      })}
    </div>
  );
}
