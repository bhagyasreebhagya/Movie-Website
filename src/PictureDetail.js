// PictureDetail.js
import { useContext } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "./App";
import Figure from 'react-bootstrap/Figure';



const PictureDetail = () => {
  const { id } = useParams(); 

  const [user] = useContext(MovieContext);

   const pictureData = user.find((element) => id === element.imdbID)
   console.log(pictureData);


  //  user.map((element) => (
  //   element.imdbID===id && setPictureData(element)
  //  ))

   
   
  //  const fetchData = () => {
  //   return fetch(`http://www.omdbapi.com/?apikey=7a60e5ca&i=${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setPictureData(data));
  // };
  
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Render the picture details
  if (!pictureData) {
    return <p>Loading or Movie not found</p>;
  }

  return (
    
    <Figure className="d-flex flex-column justify-contents-center align-items-center mt-5" >
      <Figure.Image
        width={300}
        height={300}
        alt={pictureData.Title}
        src={pictureData.Poster} 
      />
      <Figure.Caption>
      <h3>{pictureData.Title}</h3>
      <h3>{pictureData.Year}</h3>
      </Figure.Caption>
    </Figure>
     
    
  
  );
};

export default PictureDetail;
