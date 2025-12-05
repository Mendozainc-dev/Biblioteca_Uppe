import "./Header.css";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = "Usuario" }: HeaderProps) {
  return (
    <header className="header-top">
      <div className="user-pill">
        <div className="user-text">
          <div className="user-name">{userName}</div>
        </div>
        <div className="user-avatar" aria-hidden="true" />
      </div>
    </header>
  );
}
