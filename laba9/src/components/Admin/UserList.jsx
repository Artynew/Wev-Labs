import { useState, useEffect, useRef, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import Dropdown from 'react-bootstrap/Dropdown';
import { LoadingSpinner } from "../LoadingSpiner";

function UserList() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 80,
      },
      {
        accessorKey: "login",
        header: "Логин",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "role",
        header: "Роль",
        size: 120,
      },
      {
        accessorKey: "isBlocked",
        header: "Статус",
        cell: info => info.getValue() ? "Заблокирован" : "Активен",
        size: 120,
      },
      {
        id: "actions",
        header: "Действия",
        cell: ({ row }) => (
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm">
              Действия
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDelete(row.original.id)}>
                Удалить
              </Dropdown.Item>
              {row.original.isBlocked ? (
                <Dropdown.Item onClick={() => handleUnblock(row.original.id)}>
                  Разблокировать
                </Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => handleBlock(row.original.id)}>
                  Заблокировать
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        ),
        size: 150,
      },
    ],
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const parentRef = useRef(null);

  // Загрузка пользователей
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/users");
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки пользователей:", error);
      alert("Не удалось загрузить пользователей");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  // Обработчики действий
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setData(data.filter(user => user.id !== userId));
      alert("Пользователь удален");
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert("Не удалось удалить пользователя");
    }
  };

  const handleBlock = async (userId) => {
    try {
      await axios.post(`http://localhost:3000/blockUser/${userId}`);
      setData(data.map(user => 
        user.id === userId ? { ...user, isBlocked: true } : user
      ));
      alert("Пользователь заблокирован");
    } catch (error) {
      console.error("Ошибка блокировки:", error);
      alert("Не удалось заблокировать пользователя");
    }
  };

  const handleUnblock = async (userId) => {
    try {
      await axios.post(`http://localhost:3000/unblockUser/${userId}`);
      setData(data.map(user => 
        user.id === userId ? { ...user, isBlocked: false } : user
      ));
      alert("Пользователь разблокирован");
    } catch (error) {
      console.error("Ошибка разблокировки:", error);
      alert("Не удалось разблокировать пользователя");
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3" style={{ maxWidth: '1200px' }} ref={parentRef}>
      <div className="mb-3">
        <Link to="add" className="btn btn-primary me-2">Добавить пользователя</Link>
        <Link to="feedback" className="btn btn-secondary">Отзывы</Link>
      </div>

      <div style={{ height: '600px', overflow: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ width: header.getSize() }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default UserList;
