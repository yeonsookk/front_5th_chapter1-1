import HomePage from "./components/page/home";
import ProfilePage from "./components/page/profile";
import LoginPage from "./components/page/login";
import NotFoundPage from "./components/page/notFound";
import { isLoggedIn } from "./utils/login";

// 상수 정의
const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  LOGIN: "/login",
};

const ROUTE_TYPE = window.location.hash ? "hash" : "history"; // hash, history 왜 나눴을까 나는? 네?

// 라우트 객체 : 라우트 경로와 해당 경로에 대한 페이지 컴포넌트 매핑
const routes = {
  [ROUTES.HOME]: HomePage,
  [ROUTES.PROFILE]: ProfilePage,
  [ROUTES.LOGIN]: LoginPage,
  "*": NotFoundPage,
};

// 인증 관련 함수들을 분리
const auth = {
  login(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  },
  logout() {
    localStorage.removeItem("user");
    updateRoute(ROUTES.LOGIN);
    handleRoute();
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
};

// 이벤트 핸들러들을 분리
const eventHandlers = {
  handleClick(e) {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      navigate(link.href);
      return;
    }

    const actionMap = {
      login: () => {
        if (!isLoggedIn()) {
          e.preventDefault();
          const username = document.getElementById("username").value;
          auth.login({ username, email: "", bio: "" });
        }
        navigate(ROUTES.HOME);
      },
      logout: () => {
        e.preventDefault();
        auth.logout();
      },
    };

    const action = actionMap[e.target.id];
    if (action) action();
  },

  handleSubmit(e) {
    e.preventDefault();

    const formHandlers = {
      "login-form": () => {
        const username = document.getElementById("username").value;
        auth.login({ username, email: "", bio: "" });
        navigate(ROUTES.HOME);
      },
      "profile-form": () => {
        const formData = {
          username: document.getElementById("username").value,
          email: document.getElementById("email").value,
          bio: document.getElementById("bio").value,
        };
        auth.login(formData);
        renderContent(routes[ROUTES.PROFILE]());
      },
    };

    const handler = formHandlers[e.target.id];
    if (handler) handler();
  },
};

// 이벤트 리스너 등록을 한곳에서 관리
function setupEventListeners() {
  window.addEventListener("popstate", handleRoute);
  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("click", eventHandlers.handleClick);
  window.addEventListener("submit", eventHandlers.handleSubmit);
}

// 라우트 변경 함수 추가
function updateRoute(path) {
  if (ROUTE_TYPE === "hash") {
    window.location.hash = path;
  } else {
    window.history.replaceState({}, "", path);
  }
}

// 라우팅 함수 : URL이 변경된 후, popstate 이벤트리스너로 트리거되어서 실행
function handleRoute() {
  let path;
  window.location.hash
    ? (path = window.location.hash.slice(1))
    : (path = window.location.pathname);
  let page;

  if (path === ROUTES.PROFILE) {
    if (!isLoggedIn()) {
      updateRoute(ROUTES.LOGIN);
      page = routes[ROUTES.LOGIN];
    } else {
      updateRoute(ROUTES.PROFILE);
      page = routes[ROUTES.PROFILE];
    }
  } else if (path === ROUTES.LOGIN) {
    if (isLoggedIn()) {
      updateRoute(ROUTES.HOME);
      page = routes[ROUTES.HOME];
    } else {
      updateRoute(ROUTES.LOGIN);
      page = routes[ROUTES.LOGIN];
    }
  } else {
    page = routes[path] || routes["*"];
  }
  renderContent(page());
}

// 렌더링 함수
function renderContent(content) {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  rootElement.innerHTML = content;

  if (window.location.pathname === ROUTES.PROFILE) {
    const user = auth.getUser();
    // updateProfile 함수는 DOM이 완전히 렌더링 되고 나서 호출해야함 (라우트 단에서 할 수 없음)
    updateProfile(user);
  }
}

// 사용자 정보 저장
function updateProfile(user) {
  const profileForm = document.getElementById("profile-form");
  if (!profileForm) return;

  // 프로필 폼 요소 가져오기
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");

  usernameInput.value = user.username || "";
  emailInput.value = user.email || "";
  bioInput.value = user.bio || "";
}

function navigate(path) {
  if (ROUTE_TYPE === "hash") {
    const hashPath = "/" + path.split("/").pop();
    window.location.hash = hashPath;
  } else {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate")); // popstate 이벤트 (강제) 실행
  }
}

// 초기화 함수
function init() {
  setupEventListeners();
  handleRoute();
}

init();
