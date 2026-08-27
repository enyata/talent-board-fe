import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMessagesApi } from "../useMessages";
import { handleAxiosErr } from "@/lib/helpers";
import { ReplyMessageRequestBody } from "@/types/APIParamsTypes";

export const useSendMessageRequest = () => {
  const { sendMessageRequest } = useMessagesApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["send-message-request"],
    mutationFn: sendMessageRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incoming-requests"] });
      queryClient.invalidateQueries({ queryKey: ["outgoing-requests"] });
      // queryClient.invalidateQueries({ queryKey: ["active-threads"] });
    },
    onError: (err) => {
      handleAxiosErr(err);
    },
  });
};

export const useAcceptMessageRequest = () => {
  const { acceptMessageRequest } = useMessagesApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["accept-message-request"],
    mutationFn: acceptMessageRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incoming-requests"] });
      queryClient.invalidateQueries({ queryKey: ["outgoing-requests"] });
      queryClient.invalidateQueries({ queryKey: ["active-threads"] });
    },
    onError: (err) => {
      handleAxiosErr(err);
    },
  });
};

export const useDeclineMessageRequest = () => {
  const { declineMessageRequest } = useMessagesApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["decline-message-request"],
    mutationFn: declineMessageRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incoming-requests"] });
      queryClient.invalidateQueries({ queryKey: ["outgoing-requests"] });
      queryClient.invalidateQueries({ queryKey: ["active-threads"] });
    },
    onError: (err) => {
      handleAxiosErr(err);
    },
  });
};

export const useGetMessageThread = (threadId: string) => {
  const { getMessageThread } = useMessagesApi();
  return useQuery({
    queryKey: ["message-thread", threadId],
    queryFn: () => getMessageThread(threadId),
    enabled: !!threadId,
  });
};

export const useReplyMessageRequest = (threadId: string) => {
  const { replyMessageRequest } = useMessagesApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["reply-message-request", threadId],
    mutationFn: (body: Omit<ReplyMessageRequestBody, "thread_id">) =>
      replyMessageRequest({ ...body, thread_id: threadId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incoming-requests"] });
      queryClient.invalidateQueries({ queryKey: ["outgoing-requests"] });
      queryClient.invalidateQueries({ queryKey: ["active-threads"] });
    },
    onError: (err) => {
      handleAxiosErr(err);
    },
  });
};
