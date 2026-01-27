import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LAISSEZ-MOI ME <span className="purple"> PRÉSENTER </span>
            </h1>
            <p className="home-about-body">
              Actuellement en <b>Licence Informatique</b>, je me passionne pour la création de solutions logicielles et l'architecture des données.
              <br />
              <br />Mes langages de prédilection sont :
              <i>
                <b className="purple"> Java, Python, C et JavaScript. </b>
              </i>
              <br />
              <br />
              Je porte un intérêt particulier à la gestion des
              <i>
                <b className="purple"> Bases de Données (SQL, PostgreSQL, Oracle) </b>
              </i>
              et au développement d'applications web modernes.
              <br />
              <br />
              Dès que possible, j'applique mes connaissances pour concevoir des projets avec <b className="purple">Java</b> et des frameworks comme 
              <i>
                <b className="purple"> React.js</b>
              </i>, tout en utilisant des outils de versioning comme 
              <i>
                <b className="purple"> Git et GitHub</b>.
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;