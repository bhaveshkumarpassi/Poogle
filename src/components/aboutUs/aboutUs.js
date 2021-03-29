import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
} from "reactstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./aboutUs.css";
import Bhavesh from "../../Images/Bhavesh.jpeg";
import Nisha from "../../Images/Nisha.jpeg";
import Utkarsh from "../../Images/utkarsh.jpeg";
import Deepanshu from "../../Images/DeepanshuJindal.jfif";

function AboutUs() {
  return (
    <div className="container about">
      <div className="row">
        <Breadcrumb className="mt-3 ml-3">
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>About Us</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className="row justify-content-center">
        <h2 className="dev-heading">
          <span className="fa fa-lg fa-code mr-4" />
          Developers
        </h2>
      </div>
      <div className="row justify-content-center dev-content">
        <div className="col-12 col-lg-4 col-md-6 col-sm-6 mt-1 mb-4">
          <Card className="space dev-card">
            <CardBody>
              <CardTitle tag="h5" className="dev-name">
                Bhavesh Kumar
              </CardTitle>
            </CardBody>
            <CardImg className="space-img" src={Bhavesh} />
            <CardBody>
              <CardSubtitle tag="h6" className="mb-4 text-muted mt-2">
                Roles
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-4 text-muted">
                <span className="fa fa-star fa-lg question-icon mr-2" />{" "}
                Frontend Development
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <span className="fa fa-database fa-lg follower-icon mr-2" />{" "}
                Backend Development
              </CardSubtitle>
              <div className="row justify-content-between mt-5 mb-3">
                <Button
                  target="new"
                  href="https://www.linkedin.com/in/bhavesh-kumar-9ab7061b1/"
                  className="col-2 fa fa-linkedin linked ml-2"
                />
                <Button
                  target="new"
                  href="https://github.com/bhaveshkumarpassi"
                  variant="secondary"
                  className="col-2 fa fa-github git"
                />
                <Button
                  target="new"
                  href="https://www.instagram.com/_bhavesh__kumar/"
                  className="col-2 fa fa-instagram insta"
                />
                <Button
                  target="new"
                  href="mailto:bkpassi2017@gmail.com"
                  variant="success"
                  className="col-2 fa fa-envelope mail mr-2"
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-lg-4 col-md-6 col-sm-6 mt-1 mb-4">
          <Card className="space dev-card">
            <CardBody>
              <CardTitle tag="h5" className="dev-name">
                Deepanshu Jindal
              </CardTitle>
            </CardBody>
            <CardImg className="space-img" src={Deepanshu} />
            <CardBody>
              <CardSubtitle tag="h6" className="mb-4 text-muted mt-2">
                Roles
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-4 text-muted">
                <span className="fa fa-star fa-lg question-icon mr-2" />{" "}
                Frontend Development
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <span className="fa fa-database fa-lg follower-icon mr-2" />{" "}
                Backend Development
              </CardSubtitle>

              <div className="row justify-content-between mt-5 mb-3">
                <Button
                  target="new"
                  href="https://www.linkedin.com/in/deepanshu-jindal-16b2a2121/"
                  className="col-2 fa fa-linkedin linked ml-2"
                />
                <Button
                  target="new"
                  href="https://github.com/ultimatecoder2"
                  variant="secondary"
                  className="col-2 fa fa-github git"
                />
                <Button
                  target="new"
                  href="https://www.instagram.com/deepanshujindal02/"
                  className="col-2 fa fa-instagram insta"
                />
                <Button
                  target="new"
                  href="mailto:deepu.jindal2002@gmail.com"
                  variant="success"
                  className="col-2 fa fa-envelope mail mr-2"
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-lg-4 col-md-6 col-sm-6 mt-1 mb-4">
          <Card className="space dev-card">
            <CardBody>
              <CardTitle tag="h5" className="dev-name">
                Nisha
              </CardTitle>
            </CardBody>
            <CardImg className="space-img" src={Nisha} />
            <CardBody>
              <CardSubtitle tag="h6" className="mb-4 text-muted mt-2">
                Roles
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-4 text-muted">
                <span className="fa fa-star fa-lg question-icon mr-2" />{" "}
                Frontend Development
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <span className="fa fa-database fa-lg follower-icon mr-2" />{" "}
                Backend Development
              </CardSubtitle>

              <div className="row justify-content-between mt-5 mb-3">
                <Button
                  target="new"
                  href="https://www.linkedin.com/in/nisha-270102/"
                  className="col-2 fa fa-linkedin linked ml-2"
                />
                <Button
                  target="new"
                  href="https://github.com/Nisha2701 "
                  variant="secondary"
                  className="col-2 fa fa-github git"
                />
                <Button
                  target="new"
                  href="https://www.instagram.com/nishaa_2702/"
                  className="col-2 fa fa-instagram insta"
                />
                <Button
                  target="new"
                  href="mailto:sky4189986@gmail.com"
                  variant="success"
                  className="col-2 fa fa-envelope mail mr-2"
                />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-lg-4 col-md-6 col-sm-6 mt-1 mb-4">
          <Card className="space dev-card">
            <CardBody>
              <CardTitle tag="h5" className="dev-name">
                Utkarsh Goel
              </CardTitle>
            </CardBody>
            <CardImg className="space-img" src={Utkarsh} />
            <CardBody>
              <CardSubtitle tag="h6" className="mb-4 text-muted mt-2">
                Roles
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-4 text-muted">
                <span className="fa fa-star fa-lg question-icon mr-2" />{" "}
                Frontend Development
              </CardSubtitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <span className="fa fa-database fa-lg follower-icon mr-2" />{" "}
                Backend Development
              </CardSubtitle>

              <div className="row justify-content-between mt-5 mb-3">
                <Button
                  target="new"
                  href="https://www.linkedin.com/in/utkarshgoelut/"
                  className="col-2 fa fa-linkedin linked ml-2"
                />
                <Button
                  target="new"
                  href="https://github.com/UtkarshGoelUT"
                  variant="secondary"
                  className="col-2 fa fa-github git"
                />
                <Button
                  target="new"
                  href="mailto:ugoel911@gmail.com"
                  variant="success"
                  className="col-2 fa fa-envelope mail mr-2"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
