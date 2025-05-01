import { useState, useEffect } from "react";
import FeedbackForm from "./FeedBackForm";
import axios from "axios";


function FeedbackList() {
    const [feedbacks, setFeedback] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/feedbacks")
            .then(res => setFeedback(res.data));
    }, []);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:3000/feedbacks/${id}`)
            .then(res => {
                setFeedback(res.data);
            });
    };

    return (
        <div className="container">
            <h2 className="mb-4">Отзывы</h2>
            
            <div className="feedback-grid">
                {feedbacks.map((el) => (
                    <div key={el.id} className="feedback-item fade-in">
                        <h3>{el.author}</h3>
                        <p className="text-muted"></p>
                        <p>{el.answer}</p>
                        <button 
                            onClick={() => deleteItem(el.id)}
                            className="btn btn-danger btn-sm"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            <FeedbackForm feedbackAdd={setFeedback} feedbacks={feedbacks} />
        </div>
    );
}

export default FeedbackList;
