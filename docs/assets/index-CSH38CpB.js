(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) a(t);
  new MutationObserver((t) => {
    for (const l of t)
      if (l.type === "childList")
        for (const d of l.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && a(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(t) {
    const l = {};
    return (
      t.integrity && (l.integrity = t.integrity),
      t.referrerPolicy && (l.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : t.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function a(t) {
    if (t.ep) return;
    t.ep = !0;
    const l = n(t);
    fetch(t.href, l);
  }
})();
const r = () => !!localStorage.getItem("user"),
  u = () => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
`,
  m = (e) => `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li>
        <a
          href="/"
          class="${e === "/" ? "text-blue-600 font-bold" : "text-gray-600"}"
          data-link
          >홈</a
        >
      </li>
      <li>
        <a
          href="/profile"
          class="${e === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}"
          data-link
          >프로필</a
        >
      </li>
      ${
        r()
          ? `
            <li>
              <a id="logout" href="#" class="text-gray-600">로그아웃</a>
            </li>
          `
          : `
            <li>
              <a href="/login" class="text-gray-600" data-link>로그인</a>
            </li>
          `
      }
    </ul>
  </nav>
`,
  f = () => `
  <footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
`,
  b = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${u()} ${m("/")}

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea
            class="w-full p-2 border rounded"
            placeholder="무슨 생각을 하고 계신가요?"
          ></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
            게시
          </button>
        </div>

        <div class="space-y-4">${h.map(g).join("")}</div>
      </main>

      ${f()}
    </div>
  </div>
`,
  h = [
    {
      id: 0,
      username: "홍길동",
      content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
      createdAt: "5분전",
    },
    {
      id: 1,
      username: "김철수",
      content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
      createdAt: "15분전",
    },
    {
      id: 2,
      username: "이영희",
      content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
      createdAt: "30분전",
    },
    {
      id: 3,
      username: "박민수",
      content: "주말에 등산 가실 분 계신가요? 함께 가요!",
      createdAt: "1시간전",
    },
    {
      id: 4,
      username: "정수연",
      content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
      createdAt: "2시간전",
    },
  ],
  g = (e) => `
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center mb-2">
      <img
        src="https://placehold.co/40"
        alt="프로필"
        class="rounded-full mr-2"
      />
      <div>
        <p class="font-bold">${e.username}</p>
        <p class="text-sm text-gray-500">${e.createdAt}</p>
      </div>
    </div>
    <p>${e.content}</p>
    <div class="mt-2 flex justify-between text-gray-500">
      <button>좋아요</button>
      <button>댓글</button>
      <button>공유</button>
    </div>
  </div>
`,
  x = () => `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${u()} ${m("/profile")}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value="홍길동"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="hong@example.com"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                >
안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea
                >
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${f()}
      </div>
    </div>
  </div>
`,
  w = () => (
    r() &&
      (history.pushState({}, "", "/"),
      window.dispatchEvent(new Event("popstate"))),
    `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
          항해플러스
        </h1>
        <form id="login-form">
          <div class="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="사용자 이름"
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
              class="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded font-bold"
          >
            로그인
          </button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6" />
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">
            새 계정 만들기
          </button>
        </div>
      </div>
    </main>
  `
  ),
  y = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div
      class="bg-white p-8 rounded-lg shadow-md w-full text-center"
      style="max-width: 480px"
    >
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`,
  p = window.location.hash ? "hash" : "history";
p === "history" && window.history.pushState(null, null, "/");
const s = { "/": b, "/profile": x, "/login": w, "*": y };
function i(e) {
  p === "hash"
    ? (window.location.hash = e)
    : window.history.replaceState({}, "", e);
}
function c() {
  let e;
  window.location.hash
    ? (e = window.location.hash.slice(1))
    : (e = window.location.pathname);
  let o;
  e === "/profile"
    ? r()
      ? (i("/profile"), (o = s["/profile"]))
      : (i("/login"), (o = s["/login"]))
    : e === "/login"
      ? r()
        ? (i("/"), (o = s["/"]))
        : (i("/login"), (o = s["/login"]))
      : (o = s[e] || s["*"]),
    v(o());
}
function v(e) {
  const o = document.getElementById("root");
  if (o && ((o.innerHTML = e), window.location.pathname === "/profile")) {
    const n = JSON.parse(localStorage.getItem("user"));
    $(n);
  }
}
function $(e) {
  if (!document.getElementById("profile-form")) return;
  const n = document.getElementById("username"),
    a = document.getElementById("email"),
    t = document.getElementById("bio");
  (n.value = e.username || ""),
    (a.value = e.email || ""),
    (t.value = e.bio || "");
}
window.addEventListener("popstate", c);
window.addEventListener("hashchange", c);
c();
