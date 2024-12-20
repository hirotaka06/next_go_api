"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Trash2, UserPlus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  ID: number;
  Name: string;
  Age: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState<User>({ ID: 0, Name: "", Age: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const createUser = () => {
    if (!newUser.Name || !newUser.Age) {
      setErrorMessage("無効な入力です");
      return;
    }
    setErrorMessage("");
    const age = parseInt(newUser.Age.toString()) || 0;
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newUser.Name, age }),
    })
      .then(() => fetch("http://localhost:8080/users"))
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setNewUser({ ID: 0, Name: "", Age: "" });
        setShowForm(false);
      })
      .catch((error) => console.error("Error creating user:", error));
  };

  const deleteUser = (id: number) => {
    fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE",
    })
      .then(() => fetch("http://localhost:8080/users"))
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error deleting user:", error));
  };

  const updateUser = (id: number) => {
    fetch(`http://localhost:8080/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editedName }),
    })
      .then(() => fetch("http://localhost:8080/users"))
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setEditingUserId(null);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="w-full py-12 bg-background">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            User Directory
          </h1>
          <p className="font-mono text-lg text-muted-foreground">
            My first project using a RESTful API
          </p>
        </div>

        <div className="relative rounded-md overflow-hidden bg-card shadow-sm border border-border">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-semibold text-card-foreground">
                Team Members
              </div>
              <Button
                className="bg-green-600 text-white hover:bg-green-700 text-xs px-3 py-1 rounded-md"
                onClick={() => setShowForm(!showForm)}
              >
                <div className="flex items-center text-sm">
                  <UserPlus className="mr-2 mt-2 mb-2 h-4 w-4" /> Add User
                </div>
              </Button>
            </div>
            {showForm && (
              <div className="mb-6">
                <div className="flex gap-4 mb-6 items-center">
                  <div className="flex flex-col">
                    <label className="text-xs text-black mb-1 ml-2">Name</label>
                    <input
                      type="text"
                      placeholder="Yabi"
                      value={newUser.Name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, Name: e.target.value })
                      }
                      className="border p-2 rounded-lg shadow-sm text-foreground border-border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-black mb-1 ml-2">Age</label>
                    <input
                      type="number"
                      placeholder="7"
                      value={newUser.Age}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          Age: e.target.value,
                        })
                      }
                      className="border p-2 rounded-lg shadow-sm text-foreground border-border"
                    />
                  </div>
                  <button
                    onClick={createUser}
                    className="group bg-primary text-primary-foreground p-2 rounded-lg shadow-md hover:bg-primary/90 transition mt-4 w-24"
                  >
                    <span className="group-hover:animate-rainbow">Create</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setErrorMessage("");
                    }}
                    className="bg-black text-white p-2 rounded-lg shadow-md hover:bg-gray-600 transition mt-4 ml-2 w-24"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {errorMessage && (
              <p className="text-red-500 text-xs mb-4 mt-0">{errorMessage}</p>
            )}
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/50 border-b border-border">
                  <TableHead className="text-sm font-semibold text-muted-foreground py-3">
                    ID
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-muted-foreground py-3">
                    Name
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-muted-foreground py-3">
                    Age
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-muted-foreground py-3">
                    Edit
                  </TableHead>
                  <TableHead className="text-sm font-semibold text-muted-foreground py-3">
                    Delete
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(users || []).map((user) => (
                  <TableRow
                    key={user.ID}
                    className="hover:bg-muted/30 transition-colors border-b border-border last:border-b-0"
                  >
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {user.ID}
                    </TableCell>
                    <TableCell>
                      {editingUserId === user.ID ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="border p-1 rounded"
                          />
                          <button
                            onClick={() => updateUser(user.ID)}
                            className="font-mono ml-2 bg-green-600 text-white p-1 rounded-md hover:bg-green-700 text-sm w-20"
                          >
                            OK
                          </button>
                        </div>
                      ) : (
                        <span>{user.Name}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {user.Age}
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-muted-foreground hover:text-blue-500 transition-colors focus:outline-none rounded p-1 ml-2"
                        onClick={() => {
                          setEditingUserId(user.ID);
                          setEditedName(user.Name);
                        }}
                      >
                        <Pencil size={16} />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-muted-foreground hover:text-red-500 transition-colors focus:outline-none rounded p-1 ml-4"
                        onClick={() => deleteUser(user.ID)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
