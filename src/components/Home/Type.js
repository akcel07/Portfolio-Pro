import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Étudiant en Licence Informatique",
          "Développeur Java & Python",
          "Expert en bases de données SQL",
          "Passionné par le Développement Web",
          "Maîtrise de C et JavaScript",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;