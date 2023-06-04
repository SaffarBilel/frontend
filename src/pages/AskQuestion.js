import React, { useState } from "react";
import Nav from "./Nav";
import "./askquestion.css";
import reponse from "../images/reponse.jpg";
import { postQuestion } from "../Api/Question";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const navigation=useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

 

  const handleSubmit = (event) => {
    event.preventDefault();
    postQuestion({ title:title, content:content, dateOfCreation: new Date() })
      .then(() => {
        console.log('Question posted');
        // navigation("/question");
        alert('Question submitted successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Nav />

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="display-4 mt-4 mb-3 text-primary">Poser votre question</h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title" className="h5 text-secondary">Titre de la question</label>
                    <input
                      type="text"
                      className="form-control shorter-input"
                      id="title"
                      name="title"
                      value={title}
                      onChange={handleInputChange}
                      placeholder="Entrez le titre de votre question"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content" className="h5 text-secondary">Contenu de la question</label>
                    <textarea
                      className="form-control"
                      id="content"
                      name="content"
                      rows="6"
                      value={content}
                      onChange={handleInputChange}
                      placeholder="Écrivez votre question ici"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
              </div>
            </div>
          </div>
        </main>

        <img
          style={{
            position: "absolute",
            right: "0",
            width: "370px",
            height: "380px",
            marginRight: "50px"
          }}
          src={reponse} 
          className="spinner-image"
        />
      </div>
    </div>
  );
};

export default AskQuestion;
