import React, { Component } from "react";
import { getAllQuestions, deleteQuestion } from "../Api/Question";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import "./spinnerLoader.css";

import photo from "../images/photo.png";

class QuestionsPage extends Component {
  state = {
    questions: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    getAllQuestions()
      .then((response) => {
        this.setState({
          questions: response.data["hydra:member"],
          //isLoading: false,
        });
        
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
      console.log("------"+this.state.questions);
  };
  

  deleteQuestionById = (id) => {
    deleteQuestion(id)
      .then(() => {
        // Question deleted successfully, update the state or perform any necessary actions
        console.log(`Question with ID ${id} deleted.`);
        // Refresh the questions list after deletion
        this.fetchQuestions();
      })
      .catch((error) => {
        // Handle any errors that occurred during the deletion process
        console.error(`Error deleting question with ID ${id}:`, error);
      });
  };

  renderQuestions() {
    return (
      <div className="container">
        {this.state.questions.map((question) => (
          <div className="card mb-3" key={question.id}>
            <div className="card-body">
              <h5 className="card-title">{question.title}</h5>
              <p className="card-text">{question.description}</p>
              <Link to={`/questions/${question.id}`} className="btn btn-primary">
               Voir Question
              </Link>
              <button
                onClick={() => this.deleteQuestionById(question.id)}
                className="btn btn-danger"
              >
                Supprimer Question
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <Nav />

          <main role="main" className="col-md-9 ml-sm-auto col-lg-6 px-4">
            <h1 className="mt-3">Listes des  Questions</h1>

            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              this.renderQuestions()
            )}
          </main>

          <img
            style={{ width: "400px", height: "400px", marginLeft: "50px", marginTop: "50px" }}
            src={photo}
            alt="Loading"
            className="spinner-image"
          />
        </div>
      </div>
    );
  }
}

export default QuestionsPage;
