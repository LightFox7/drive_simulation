import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>
        Erreur 404
        <p>
          <Link to="/">
          Retourner au drive
          </Link>
        </p>
      </h1>
    </div>
  );
}

export default NotFoundPage;