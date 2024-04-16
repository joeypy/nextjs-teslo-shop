export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from "@/actions/users/get-users";
import { Pagination, Title, UserTable } from "@/components";

import { redirect } from "next/navigation";

export default async function OrdersAdminPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UserTable users={users} />
        <Pagination totalPages={1} />
      </div>
    </>
  );
}
