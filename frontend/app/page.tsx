import Header from "../components/Header";
import UserTable from "../components/UserTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <UserTable />
    </main>
  );
}
