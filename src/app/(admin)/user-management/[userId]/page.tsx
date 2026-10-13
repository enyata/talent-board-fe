"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useAdminUsersStore } from "@/store/adminUsersStore";
import { UserProfile } from "@/components/admin/users/user-profile";

const UserProfilePage = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const user = useAdminUsersStore((s) => s.users.find((u) => u.id === userId));

  if (!user) notFound();

  return (
    <div className="w-full px-4 pt-4 pb-[80px] md:px-[32px]">
      <UserProfile user={user} />
    </div>
  );
};

export default UserProfilePage;
