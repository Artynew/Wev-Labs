import { useState, useEffect, useMemo, useRef } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function FeedbackAdmin() {
  const [allFeedbacks, setAllFeedbacks] = useState([]); // Все загруженные отзывы
  const [visibleFeedbacks, setVisibleFeedbacks] = useState([]); // Видимые отзывы
  const [currentChunk, setCurrentChunk] = useState(0); // Текущая порция
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const chunkSize = 5; // Размер порции
  const observerRef = useRef();

  // Загрузка всех отзывов один раз
  useEffect(() => {
    const fetchAllFeedbacks = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/feedbacks`);
        setAllFeedbacks(res.data);
        setHasMore(res.data.length > 0);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllFeedbacks();
  }, []);

  // Обновление видимых отзывов при изменении currentChunk
  useEffect(() => {
    const start = currentChunk * chunkSize;
    const end = start + chunkSize;
    setVisibleFeedbacks(allFeedbacks.slice(0, end));
    setHasMore(end < allFeedbacks.length);
  }, [currentChunk, allFeedbacks]);

  // Настройка Intersection Observer для подгрузки
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setCurrentChunk(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, isLoading]);

  // Удаление отзыва
  const deleteItem = (id) => {
    axios.delete(`http://localhost:3000/feedbacks/${id}`).then(() => {
      setAllFeedbacks(prev => prev.filter(item => item.id !== id));
      alert("Удалено");
    });
  };

  // Колонки таблицы
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "author", header: "Автор" },
      { accessorKey: "answer", header: "Текст" },
      {
        id: "actions",
        header: "Действия",
        cell: ({ row }) => (
          <div
            onClick={() => deleteItem(row.original.id)}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
            </svg>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: visibleFeedbacks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container className="list__container w-75 mt-3">
      <h2>Отзывы:</h2>
      <div style={{ overflow: "auto", maxHeight: "600px" }}>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ position: "sticky", top: 0, background: "white" }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr ref={observerRef}>
              <td colSpan={4} style={{ textAlign: "center" }}>
                {isLoading
                  ? "Загрузка..."
                  : hasMore
                  ? "Прокрутите вниз для загрузки следующих отзывов"
                  : "Все отзывы загружены"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default FeedbackAdmin;
