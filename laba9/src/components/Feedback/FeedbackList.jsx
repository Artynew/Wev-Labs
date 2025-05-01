import { useState, useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

function FeedbackList() {
  const [feedbacks, setFeedback] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/feedbacks").then((res) => {
      setFeedback(res.data);
    });
  }, []);

  const role = useSelector((state) => state.role);
  console.log(role)

  const deleteItem = useCallback((data) => {
    axios.delete("http://localhost:3000/feedbacks/" + data).then((res) => {
      alert("Удалено");
      setFeedback(res.data);
    });
  }, []);


  return (
    <>
      <Container className="list__container w-50">
        <h2>Отзывы:</h2>
        <div>
          {feedbacks.map((el) => {
            return (
              <div
                className="px-3 border rounded mb-2 d-flex align-items-center"
                key={el["id"]}
              >
                <div className="me-auto">
                  {el["id"]}
                  <h3>Автор: {el["author"]}</h3>
                  <p>Текст: {el["answer"]}</p>
                  
                </div>
                { role === "admin" ?<div onClick={() => deleteItem(el["id"])}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </div> : <></> }
                
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default FeedbackList;
