import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";

const ChatListEmptyState = ({ query }: { query: string }) => {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center text-[#101828]">
      <Image src="/assets/icons/Chat.svg" alt="" height={120} width={120} />
      <p className="my-[16px] text-sm">
        {query
          ? "No result returned for your search query"
          : "Looks like you haven’t started a conversation yet"}
      </p>
      {user?.role === "recruiter" && (
        <Button asChild>
          <Link href={"/dashboard/talents"}>Search Talents</Link>
        </Button>
      )}
    </div>
  );
};

export default ChatListEmptyState;
