import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SmallTitle from "../../components/jobscape/SmallTitle";
import InProgressProjectTab from "../../components/jobscape/InProgressProjectTab";
import CompletedProjectTab from "../../components/jobscape/CompletedProjectTab";
import ProjectPostedTab from "../../components/jobscape/ProjectPostedTab";
import axios from "axios";
import "../../components-css/jobscape/Notification.css";
import "../../pages-css/Jobscape/ReviewProjectPage.css";

const ReviewProjectPage = () => {
  const navigate = useNavigate();
  const [ProjectPosted, setProjectPosted] = useState([]);
  const [inProgressProjects, setInProgressProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    //fetch posted projected
    axios
      .get("http://localhost:5050/recruite?status=posted")
      .then((response) => {
        console.log(response.data); 
        setProjectPosted(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posted projects:", error);
      });

    // Fetch in progress projects
    axios
      .get("http://localhost:5050/recruite?status=in-progress")
      .then((response) => {
        console.log(response.data); // Log the response data to the console
        setInProgressProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching in progress projects:", error);
      });

    // Fetch completed projects
    axios
      .get("http://localhost:5050/recruite?status=completed")
      .then((response) => {
        setCompletedProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching completed projects:", error);
      });
  }, []);

  const handleReviewFormSubmit = () => {
    setShowNotification(true);
  };

  return (
    <div className="ReviewProjectPage">
      <div className="ReviewBackBtn">
        <Button className="BackBtn" onClick={() => navigate(-1)}>
          <p>
            <i className="bi-chevron-left" />
            Back
          </p>
        </Button>
      </div>

      <div className="Reviewheader">
        <SmallTitle
          className="ReviewTitle"
          title="Review Your Recent Project"
          fontWeight="700"
          fontSize="36px"
        />
      </div>

      <div className="ProjectPosted">
        <SmallTitle title="Project Posted" fontWeight="400" fontSize="32px" />
        <div className="ProjectPostedList">
          {ProjectPosted.map((project, index) => (
            <ProjectPostedTab
              key={index}
              projectTitle={project.projectTitle}
              due={new Date(project.deadline).toLocaleDateString("en-GB")} // Format the deadline
              budget={project.projectBudget}
              collaborator={project.timestamps}
            />
          ))}
        </div>
      </div>

      <div className="InProgress">
        <SmallTitle title="In Progress" fontWeight="400" fontSize="32px" />
        <div className="InProgressList">
          {inProgressProjects.map((project, index) => (
            <InProgressProjectTab
              key={index}
              projectTitle={project.projectTitle}
              due={new Date(project.deadline).toLocaleDateString("en-GB")} // Format the deadline
              budget={project.projectBudget}
              postedDate={project.PIC}
            />
          ))}
        </div>
      </div>

      <div>
        <SmallTitle title="Completed" fontWeight="400" fontSize="32px" />
        <div className="CompletedProjectList">
          {completedProjects.map((project, index) => (
            <CompletedProjectTab
              key={index}
              projectTitle={project.projectTitle}
              due={new Date(project.deadline).toLocaleDateString("en-GB")} // Format the deadline
              budget={project.projectBudget}
              collaborator={project.PIC}
            />
          ))}
        </div>
      </div>

      {showNotification && (
        <div className="overlay">
          <div className="post-project-notification">
            <p>Your review has been successfully submitted!</p>
            <button onClick={() => setShowNotification(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewProjectPage;
