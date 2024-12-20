import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center w-full px-4 py-4 bg-background">
      <div className="header-wrapper w-full max-w-7xl">
        <header className="w-full h-16 bg-card/50  border border-border rounded-full flex items-center px-8">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div>
              <Link
                href="https://github.com/hirotaka06/next_go_api"
                className="text-2xl font-bold text-blue-800"
                style={{ fontFamily: "Rubik Iso, sans-serif" }}
              >
                RESTful API
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
