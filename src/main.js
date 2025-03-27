import MainPage from "./components/page/main";
import ProfilePage from "./components/page/profile";
import LoginPage from "./components/page/login";
import NotFoundPage from "./components/page/notFound";

// 라우트 객체 : 라우트 경로와 해당 경로에 대한 페이지 컴포넌트 매핑
const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": NotFoundPage,
};

// 라우팅 함수 : URL이 변경된 후, popstate 이벤트를 통해 route() 함수가 실행
function handleRoute() {
  const path = window.location.pathname;
  let page;

  if (path === "/profile") {
    if (!isLoggedIn()) {
      // REVIEW: 왜 동작이 기대처럼 되지 않는가
      // history.replaceState({}, "", "/login");
      // window.dispatchEvent(new Event("popstate"));

      // 로그인 페이지로 리다이렉트
      history.replaceState({}, "", "/login");
      page = routes["/login"];
    } else {
      page = routes["/profile"];
      // REVIEW: 이 처리를 왜 여기서 하면 안될까
      // const user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);s
      // updateProfile(user);
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

  // REVIEW:불필요한 코드인가? -> innerHTML의 동작은 자동으로 덮어씌워지므로 초기화 필요없음
  // while (rootElement.firstChild) {
  //   rootElement.removeChild(rootElement.firstChild);
  // }
  rootElement.innerHTML = content;

  if (window.location.pathname === "/profile") {
    const user = JSON.parse(localStorage.getItem("user"));
    updateProfile(user);
  }
}

// 사용자 정보 저장
// DOM이 완전히 렌더링 되고 나서 호출해야함
function updateProfile(user) {
  const profileForm = document.getElementById("profile-form");
  if (!profileForm) return;

  // 아, 새로운 오류를 발견했네요. getElementById는 document 객체의 메서드이지 일반 DOM 요소의 메서드가 아닙니다.
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bioInput = document.getElementById("bio");

  usernameInput.value = user.username || "";
  emailInput.value = user.email || "";
  bioInput.value = user.bio || "";
}

// popstate 이벤트 리스너
window.addEventListener("popstate", handleRoute);

// 로드 이벤트 리스너
// window.addEventListener("load", handleRoute);

handleRoute();

function navigate(path) {
  history.pushState({}, "", path); // URL변경 (브라우저의 히스토리 스택에 새로운 상태 추가)
  window.dispatchEvent(new Event("popstate")); // popstate 이벤트 강제 실행
}

// 로그인 여부 확인
const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

const logOut = () => {
  localStorage.removeItem("user");
  // 브라우저의 히스토리 스택에 메인 페이지로 교체
  history.replaceState({}, "", "/");
};

// 네비게이션 요소 연결
// 클릭 이벤트 리스너
window.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigate(link.href);
  } else if (e.target.id === "login") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" }),
    );
    navigate("/");
  } else if (e.target.id === "logout") {
    e.preventDefault();
    logOut();
    navigate("/");
  }
});

// 폼 제출 이벤트 리스너
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
    navigate("/");
  }
});
