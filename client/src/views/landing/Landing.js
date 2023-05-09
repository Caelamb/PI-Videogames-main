import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";
import backgroundImage from "../../assets/background.jpg";

const Landing = () => {
    return (
        <div className={styles["landing-page"]}>
            <img src={backgroundImage} alt="Background" />
            <Link to="/home" className={styles["button"]}>
                Ingresar a la Home Page
            </Link>
        </div>
    );
};

export default Landing;





// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "../landing/landing.module.css";
// import backgroundImage from "../../assets/background.jpg";

// const Landing = () => {
//     return (
//         <div className={styles["landing-page"]}>
//             <img src={backgroundImage} alt="Background" />
//             <Link to="/home" className={styles["button"]}>
//             Ingresar a la Home Page
//             </Link>
//         </div>
//     );
// };

// export default Landing;