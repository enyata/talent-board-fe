import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessagesApi } from "../useMessages";
import { handleAxiosErr } from "@/lib/helpers";

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
