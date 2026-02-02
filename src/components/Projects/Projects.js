import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// Importation des images (Assure-toi de mettre ces fichiers dans src/Assets/Projects/)
import corewarImg from "../../Assets/Projects/corewar.png"; 
import blockworldImg from "../../Assets/Projects/blockworld.png";
import blackjackImg from "../../Assets/Projects/blackjack.jpg";
import navaleImg from "../../Assets/Projects/bataille_navale.jpg";
import todoImg from "../../Assets/Projects/todolist.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Mes Travaux <strong className="purple">Récents </strong>
        </h1>
        <p style={{ color: "white" }}>
          Voici quelques projets sur lesquels j'ai travaillé récemment.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={corewarImg}
              isBlog={false}
              title="CoreWar"
              description="Simulateur complet en Java avec machine virtuelle MARS, interface graphique et algorithme génétique pour générer automatiquement des programmes RedCode performants. Un projet mêlant système et IA."
              ghLink="https://github.com/akcel07/CoreWar" 
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={blockworldImg}
              isBlog={false}
              title="BlockWorld"
              description="Implémentation du 'Monde des Blocs' en Java. Exploration de l'IA via la modélisation, la planification et la résolution de contraintes pour la manipulation logique d'objets."
              ghLink="https://github.com/akcel07/BlockWorld"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={blackjackImg}
              isBlog={false}
              title="BlackJack"
              description="Simulation de Blackjack en Java avec interface Swing. Utilisation de Design Patterns (Factory, Strategy) pour une architecture modulaire et une IA adverse performante."
              ghLink="https://github.com/akcel07/BlackJack"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={navaleImg}
              isBlog={false}
              title="Bataille Navale"
              description="Jeu de stratégie reposant sur une architecture MVC. Inclut un mode console et une interface graphique Swing avec une gestion de grille optimisée."
              ghLink="https://github.com/akcel07/Bataille_Navale"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={todoImg}
              isBlog={false}
              title="TodoList"
              description="Application desktop de gestion de tâches. Focus sur la persistance des données et la création d'une interface utilisateur intuitive pour le suivi d'objectifs."
              ghLink="https://github.com/akcel07/TodoList"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;