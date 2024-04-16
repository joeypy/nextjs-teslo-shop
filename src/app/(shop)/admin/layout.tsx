import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function LayoutAdmin({ children }: Props) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/login");
  }

  return <>{children}</>;
}
