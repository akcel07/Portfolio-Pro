import React from "react";
import { Col, Row } from "react-bootstrap";
import { SiLinux } from "react-icons/si"; // On utilise l'icône Linux officielle
import chrome from "../../Assets/TechIcons/Google Chrome.svg";
import vsCode from "../../Assets/TechIcons/vscode.svg";
import intelliJ from "../../Assets/TechIcons/intellij-idea.svg";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* Ajout de Linux */}
      <Col xs={4} md={2} className="tech-icons">
        <SiLinux fontSize={"1.5em"} />
        <div className="tech-icons-text">Linux (Ubuntu)</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={vsCode} alt="vsCode" className="tech-icon-images" />
        <div className="tech-icons-text">VS Code</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={intelliJ} alt="IntelliJ" className="tech-icon-images" />
        <div className="tech-icons-text">IntelliJ</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={chrome} alt="Chrome" className="tech-icon-images" />
        <div className="tech-icons-text">Chrome</div>
      </Col>
    </Row>
  );
}

export default Toolstack;