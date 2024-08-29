import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <nav className="sidebar">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/test"}>Test</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
