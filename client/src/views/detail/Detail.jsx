import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoGameDetails } from "../../redux/actions/index";
import { useParams } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { videoGameDetails, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchVideoGameDetails(id));
  }, [dispatch, id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

// ...
return (
  <div>
    {videoGameDetails && (
      <div>
        <h2>ID: {videoGameDetails.id}</h2>
        <h2>Nombre: {videoGameDetails.name}</h2>
        <img src={videoGameDetails.image} alt={videoGameDetails.name} />
        {Array.isArray(videoGameDetails.platforms) ? (
          <p>Plataformas: {videoGameDetails.platforms.join(", ")}</p>
        ) : (
          <p>Plataformas: {videoGameDetails.platforms}</p>
        )}
        <p>Descripción: {videoGameDetails.description}</p>
        <p>
        Fecha de lanzamiento: {videoGameDetails.release_date || videoGameDetails.releaseDate}
      </p>
        <p>Rating: {videoGameDetails.rating}</p>
        {Array.isArray(videoGameDetails.genres) ? (
          <p>Géneros: {videoGameDetails.genres.join(", ")}</p>
        ) : (
          videoGameDetails.genres && (
            <p>Géneros: {videoGameDetails.genres}</p>
          )
        )}
    {Array.isArray(videoGameDetails.Genres) ? (
      <p>
        Géneros:{" "}
        {videoGameDetails.Genres.map((genre) => genre.name).join(", ")}
      </p>
    ) : (
      videoGameDetails.Genres && <p>Géneros: {videoGameDetails.Genres.name}</p>
    )}
      </div>
    )}
  </div>
);
};
// ...

export default Detail;


// {Array.isArray(videoGameDetails.genres) && (
//   <p>Géneros: {videoGameDetails.genres.join(", ")}</p>
// )}