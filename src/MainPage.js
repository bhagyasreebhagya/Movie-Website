// MainPage.js
import React, { useState, useEffect, useCallback, useRef} from "react";
import style from './MainPage.module.css';
import './App.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "./App";
import {Card,Container,Row,Col,Form } from 'react-bootstrap';




const MainPage = (e) => {
 
  
  const [user, setUser] = useContext(MovieContext);

  const [title, setTitle] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const[displaySuggestions,setDisplaySuggestions]=useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionsContainerRef = useRef(null);

  // const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const fetchSuggestions = async (title) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=7a60e5ca&s=${title}`);
    const data = await response.json();
    setSuggestions(data.Search || []);
    setSelectedSuggestionIndex(-1);
  };


  
  useEffect(() => {
    fetchSuggestions(title);
  }, [title]);

  const fetchData = async(title)=>{
    console.log(title)
    // e.preventDefault();
    const response=await fetch (`http://www.omdbapi.com/?apikey=7a60e5ca&s=${title}`)
    const data=await response.json()
    setUser(data.Search);
  }
  useEffect(() => {
    fetchData('home');
    // suggestions && setUser(suggestions)
  },[]); 

//for key movemets
  // const handleKeyDown = useCallback(
  //   (e) => {
  //     if (suggestions.length === 0) return;
      
  //     switch (e.key) {
  //       case "ArrowUp":
  //         setSelectedSuggestionIndex((prevIndex) =>
  //           prevIndex > 0 ? prevIndex - 1 : prevIndex
  //         );
  //         console.log(e.key)
  //         console.log(selectedSuggestionIndex)
  //         break;
  //       case "ArrowDown":
  //         setSelectedSuggestionIndex((prevIndex) =>
  //           prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
  //         );
  //         console.log(selectedSuggestionIndex)
  //         break;
  //       case "Enter":
  //         if (selectedSuggestionIndex !== -1) {
  //           setDisplaySuggestions(false);
  //           setTitle(suggestions[selectedSuggestionIndex].Title);
  //           fetchData(suggestions[selectedSuggestionIndex].Title);
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   [suggestions]
  // );

  // useEffect(() => {
  //   window.addEventListener("keyup", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keyup", handleKeyDown);
  //   };
  // }, [handleKeyDown]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0) {
        // User pressed Enter to select a suggestion
        fetchData(suggestions[selectedSuggestionIndex].Title);
        setSelectedSuggestionIndex(-1); // Reset selected suggestion
      } else {
        // User pressed Enter without selecting a suggestion
        fetchData(title);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    }
  };
  


  return (
    
    <main>
      <Form autoComplete="off" onSubmit={(e) => {
  e.preventDefault();
  fetchData(title);
}} className="form d-flex gap-2 mx-auto my-2 w-50">

<div className="input-group mt-5">
<Form.Control
    id="input"
    type="text"
    className="input" 
    placeholder="Type Here..."
    value={title}
    onChange={(e) => {
      setDisplaySuggestions(true)
      setTitle(e.target.value)
    }}
    onKeyDown={handleKeyDown}
    
  />
  <button type="submit" className="btn btn-primary" >
  <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg></button>
</div>
  
  <div>

  </div>
  {displaySuggestions && (
  <ul className={style.list} ref={suggestionsContainerRef}>
  {suggestions &&
    suggestions.map((suggestion, index) => (
      <li
        key={suggestion.imdbID}
        className={selectedSuggestionIndex === index ? "selected" : ""}
      >
        <button
          onClick={() => {
            setDisplaySuggestions(false); // Hide suggestions
            setTitle(suggestion.Title);
            fetchData(suggestion.Title);
          }}
        >
          {suggestion.Title}
        </button>
      </li>
    ))}
</ul>

  )}
  
</Form>

      
      <Container className="mx-auto my-5 w-100">
      {/* <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> */}
<Row>
        {user && user.length > 0 &&
          user.map((element) => (
            <Col key={element.imdbID}>
            <Link to={`/${element.imdbID}`} >
                <Card style={{ width: '18rem' ,marginBottom:'35px'}}>
      <Card.Img variant="top" src={element.Poster} style={{height:'400px'}}/>
      <Card.Body>
        <Card.Title>{element.Title.slice(0, 20)}...</Card.Title>
        
        

      </Card.Body>
    </Card>
              </Link>
              </Col>
          ))}
          </Row>
      </Container>
    </main>
  );
};

export default MainPage;