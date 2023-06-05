import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/buildRoutePath.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ Erro: "Titulo obrigatório" }));
      }

      if (!description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ Erro: "Descrição obrigatória" }));
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    }
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search ? { title: search, description: search } : null
      );

      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      let dataReq;

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ Erro: "Titulo ou descrição não pode ser vazio." })
          );
      }

      if (title && !description) {
        dataReq = { title: title, updated_at: new Date() };
      } else if (!title && description) {
        dataReq = { description: description, updated_at: new Date() };
      } else {
        dataReq = {
          title: title,
          description: description,
          updated_at: new Date()
        };
      }

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ Erro: "Id não encontrado" }));
      }

      database.update("tasks", id, dataReq);

      return res.writeHead(204).end();
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ Erro: "Id não encontrado" }));
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ Erro: "Id não encontrado" }));
      }

      const taskCompleted = !!task.completed_at;
      const completed_at = taskCompleted ? null : new Date();

      database.update("tasks", id, { completed_at });

      return res.writeHead(204).end();
    }
  }
];
