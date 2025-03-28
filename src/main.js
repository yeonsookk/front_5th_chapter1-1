import HomePage from "./components/page/home";
import ProfilePage from "./components/page/profile";
import LoginPage from "./components/page/login";
import NotFoundPage from "./components/page/notFound";
import { isLoggedIn } from "./utils/login";

const ROUTE_TYPE = window.location.hash ? "hash" : "history";
const BASE_URL = import.meta.env.PROD ? "/front_5th_chapter1-1" : "";

const routes = {
  "/": HomePage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": NotFoundPage,
};

function handleRoute() {
  let path;
  if (window.location.hash) {
    path = window.location.hash.slice(1);
  } else {
    path = window.location.pathname.replace(BASE_URL, "");
  }
  let page;

  if (path === "/profile") {
    if (!isLoggedIn()) {
      if (ROUTE_TYPE === "hash") {
        window.location.hash = "/login";
      } else {
        window.history.replaceState({}, "", BASE_URL + "/login");
      }
      page = routes["/login"];
    } else {
      if (ROUTE_TYPE === "hash") {
        window.location.hash = "/profile";
      } else {
        window.history.replaceState({}, "", BASE_URL + "/profile");
      }
      page = routes["/profile"];
    }
  } else if (path === "/login") {
    if (isLoggedIn()) {
      if (ROUTE_TYPE === "hash") {
        window.location.hash = "/";
      } else {
        window.history.replaceState({}, "", BASE_URL + "/");
      }
      page = routes["/"];
    } else {
      if (ROUTE_TYPE === "hash") {
        window.location.hash = "/login";
      } else {
        window.history.replaceState({}, "", BASE_URL + "/login");
      }
      page = routes["/login"];
    }
  } else {
    page = routes[path] || routes["*"];
  }
  renderContent(page());
}

function renderContent(content) {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  rootElement.innerHTML = content;

  const path = window.location.pathname.replace(BASE_URL, "");
  if (path === "/profile") {
    const user = JSON.parse(localStorage.getItem("user"));
    updateProfile(user);
  }
}

function updateProfile(user) {
  const profileForm = document.getElementById("profile-form");
  if (!profileForm) return;

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");

  usernameInput.value = user.username || "";
  emailInput.value = user.email || "";
  bioInput.value = user.bio || "";
}

window.addEventListener("popstate", handleRoute);
window.addEventListener("hashchange", handleRoute);
handleRoute();

function navigate(path) {
  if (ROUTE_TYPE === "hash") {
    const hashPath = "/" + path.split("/").pop();
    window.location.hash = hashPath;
  } else {
    window.history.pushState({}, "", BASE_URL + path);
    window.dispatchEvent(new Event("popstate"));
  }
}

window.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigate(link.href);
  } else if (e.target.id === "login") {
    if (!isLoggedIn()) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      localStorage.setItem(
        "user",
        JSON.stringify({ username, email: "", bio: "" }),
      );
    }
    navigate("/");
  } else if (e.target.id === "logout") {
    console.log("logout");
    e.preventDefault();
    localStorage.removeItem("user");
    if (ROUTE_TYPE === "hash") {
      window.location.hash = "/login";
    } else {
      window.history.replaceState({}, "", BASE_URL + "/login");
    }
    handleRoute();
  }
});

window.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === "login-form") {
    const username = document.getElementById("username").value;
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" }),
    );
    navigate("/");
  } else if (e.target.id === "profile-form") {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    renderContent(routes["/profile"]());
  }
});
