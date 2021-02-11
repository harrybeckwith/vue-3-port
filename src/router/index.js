import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const Board = () => import("../views/Board.vue");
const Task = () => import("../views/Task.vue");
const Home = () => import("../views/Home.vue");
const Posts = () => import("../views/Posts.vue");
const Notes = () => import("../views/Notes.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/board",
    name: "board",
    component: Board,
    children: [
      {
        path: "task/:id",
        name: "task",
        component: Task,
      },
    ],
  },
  {
    path: "/posts/:id",
    name: "posts",
    component: Posts,
    params: true,
  },
  {
    path: "/notes",
    name: "notes",
    component: Notes,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
