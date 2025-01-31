import { Menu } from "./Menu";

export function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "10px 20px",
        textAlign: "end",
      }}
    >
      <Menu />
    </header>
  );
}
