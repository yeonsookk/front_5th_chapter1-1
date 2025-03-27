const Header = () => /* HTML */ `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
`;

const Nav = () => /* HTML */ `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="text-blue-600" data-link>홈</a></li>
      <li><a href="/profile" class="text-gray-600" data-link>프로필</a></li>
      <li>
        <a href="#" class="text-gray-600" id="logout">로그아웃</a>
      </li>
    </ul>
  </nav>
`;

export { Header, Nav };
