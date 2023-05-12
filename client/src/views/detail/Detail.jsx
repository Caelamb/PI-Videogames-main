import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoGameDetails } from "../../redux/actions/index";
import { useParams, Link } from "react-router-dom";
import styles from "../detail/detail.module.css";

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

  return (
    <div className={styles.container} >
      {videoGameDetails && (
        <div>
          <h2 className={styles.title}>ID: {videoGameDetails.id}</h2>
          <h2 className={styles.title}>Name: {videoGameDetails.name}</h2>
          <img className={styles.image} src={videoGameDetails.image} alt={videoGameDetails.name} />
          {Array.isArray(videoGameDetails.platforms) ? (
            <p className={styles.info}>Platfmors: {videoGameDetails.platforms.join(", ")}</p>
          ) : (
            <p className={styles.info}>Platforms: {videoGameDetails.platforms}</p>
          )}
          <p className={styles.description}>Description: {videoGameDetails.description}</p>
          <p className={styles.info}>Release Date: {videoGameDetails.release_date || videoGameDetails.releaseDate}</p>
          <p className={styles.info}>Ratting: {videoGameDetails.rating}</p>
          {Array.isArray(videoGameDetails.genres) ? (
            <p className={styles.info}>Genres: {videoGameDetails.genres.join(", ")}</p>
          ) : (
            videoGameDetails.genres && (
              <p className={styles.info}>Genres: {videoGameDetails.genres}</p>
            )
          )}
          {Array.isArray(videoGameDetails.Genres) ? (
            <p className={styles.info}>
              Genres: {videoGameDetails.Genres.map((genre) => genre.name).join(", ")}
            </p>
          ) : (
            videoGameDetails.Genres && <p className={styles.info}>Genres: {videoGameDetails.Genres.name}</p>
          )}
        </div>
      )}
      <Link to="/home" className={styles.button}>Go back to the main page</Link>
    </div>
  );
};

export default Detail;



// {Array.isArray(videoGameDetails.genres) && (
//   <p>Géneros: {videoGameDetails.genres.join(", ")}</p>
// )}