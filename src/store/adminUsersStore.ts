import { useMemo } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  AdminAction,
  AdminUser,
  AdminUserStatus,
  mockUsers,
  seedAdminActions,
} from "@/components/admin/users/data";

type StatusChange = {
  admin: AdminAction["admin"];
  note?: string;
};

// Holds the admin user list (and each user's admin-action history) so
// suspend/reactivate show up everywhere. Replace with react-query once the
// admin API exists.
interface AdminUsersState {
  users: AdminUser[];
  adminActions: Record<string, AdminAction[]>;
  setStatus: (id: string, status: AdminUserStatus, change: StatusChange) => void;
}

export const useAdminUsersStore = create<AdminUsersState>()(
  devtools(
    (set) => ({
      users: mockUsers,
      adminActions: {},
      setStatus: (id, status, { admin, note }) =>
        set((state) => {
          const entry: AdminAction = {
            id: `${id}_adm_${Date.now()}`,
            timestamp: new Date().toISOString(),
            admin,
            action: status === "suspended" ? "User suspended" : "User reactivated",
            note,
          };
          return {
            users: state.users.map((u) => (u.id === id ? { ...u, status } : u)),
            adminActions: {
              ...state.adminActions,
              [id]: [entry, ...(state.adminActions[id] ?? seedAdminActions(id))],
            },
          };
        }),
    }),
    { name: "admin-users-store" },
  ),
);

/** A user's admin actions, falling back to seeded history until something is recorded. */
export const useUserAdminActions = (id: string) => {
  const recorded = useAdminUsersStore((s) => s.adminActions[id]);
  const seeded = useMemo(() => seedAdminActions(id), [id]);
  return recorded ?? seeded;
};
