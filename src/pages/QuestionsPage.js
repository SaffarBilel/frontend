import React, { Component } from "react";
import { getAllQuestions, deleteQuestion } from "../Api/Question";
import Nav from "./Nav";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default class QuestionsPage extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    getAllQuestions()
      .then((response) => {
        const formattedQuestions = response.data["hydra:member"].map(
          (question) => {
            const formattedDate = this.formatDate(question.dateOfCreation);
            return { ...question, formattedDate };
          }
        );

        this.setState({
          questions: formattedQuestions,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  viewUser = (question) => {
    // Logic to handle viewing a user based on the question
    console.log("View user:", question);
  };

  deleteUser = (question) => {
    alert('Etes-vous sur de supprimer ce question !!');
    deleteQuestion(question.id)
      .then(() => {
        console.log("Question deleted:", question);
        this.fetchQuestions(); // Refresh the question list after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Nav />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h1 className="mt-3">Tableau des questions</h1>
            <table className="table mt-2 table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Content</th>
                  <th>Posted On</th>
                  <th>View</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.questions.map((question) => (
                  <tr key={question.id}>
                    <td className="py-2">{question.id}</td>
                    <td className="py-2">{question.title}</td>
                    <td className="py-2">{question.content}</td>
                    <td className="py-2">{question.formattedDate}</td>
                    <td>
                      <Link
                        to={`/questiondetail/${question.id}`}
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => this.viewUser(question)}
                        className="btn btn-outline-primary"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => this.deleteUser(question)}
                        className="btn btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    );
  }
}
