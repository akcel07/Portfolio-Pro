import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Bonjour à tous ! Je suis <span className="purple">Akcel Arab</span>, 
            un étudiant passionné par le développement logiciel.
            <br />
            Je suis actuellement en <span className="purple">Licence Informatique (L3)</span>, 
            où j'approfondis mes connaissances en algorithmique et en architecture système.
            <br />
            Mon parcours m'a permis de maîtriser des langages comme <span className="purple">Java, C et Python</span>, avec une expertise particulière dans la gestion des <span className="purple">Bases de Données SQL</span>.
            <br />
            <br />
            En dehors du code, j'aime m'investir dans des activités qui stimulent ma créativité :
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Explorer de nouvelles technologies 🚀
            </li>
            <li className="about-activity">
              <ImPointRight /> Résoudre des problèmes algorithmiques 🧠
            </li>
            <li className="about-activity">
              <ImPointRight /> Pratiquer le sport pour garder l'équilibre 🏃‍♂️
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Le code est une poésie où chaque point-virgule compte."{" "}
          </p>
          <footer className="blockquote-footer">Akcel</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;