import { useState, useCallback, useEffect, useRef } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { useVirtualizer } from "@tanstack/react-virtual";

function FeedbackAdmin() {
  const [feedbacks, setFeedback] = useState([]);
  const parentRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3000/feedbacks").then(res => {
      setFeedback(res.data);
    });
  }, []);

  const deleteItem = useCallback((data) => {
    axios.delete("http://localhost:3000/feedbacks/" + data).then(res => {
      alert("Удалено");
      setFeedback(prev => prev.filter(f => f.id !== data));
    });
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: feedbacks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  if (!feedbacks) {
    return (
      <Container className="w-50">
        <h2>Загрузка</h2>
      </Container>
    );
  }

  return (
    <Container className="list__container w-75 mt-3">
      <h2>Отзывы:</h2>
      <div 
        ref={parentRef} 
        style={{
          height: `400px`,
          overflow: 'auto',
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Автор</th>
              <th>Текст</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const feedback = feedbacks[virtualRow.index];
              return (
                <tr
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <td>{feedback.id}</td>
                  <td>{feedback.author}</td>
                  <td>{feedback.answer}</td>
                  <td onClick={() => deleteItem(feedback.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default FeedbackAdmin;
