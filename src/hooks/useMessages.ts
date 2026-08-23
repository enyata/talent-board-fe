"use client";

import { GET, POST } from "@/lib/requests";
import { SendMessageRequestBody } from "@/types/APIParamsTypes";
import {
  ConversationInboxResponse,
  MessageRequest,
  MessageRequestsResponse,
  Thread,
} from "@/types/APIResponseTypes";

export const useMessagesApi = () => {
  // ignoring pagination for now
  const fetchOutgoingMessageRequests = async (): Promise<MessageRequest[]> => {
    const res = await GET<MessageRequestsResponse>(
      "/api/v1/messages/requests/outgoing",
    );
    return res.data.requests || [];
  };

  // ignoring pagination for now
  const fetchIncomingMessageRequests = async (): Promise<MessageRequest[]> => {
    const res = await GET<MessageRequestsResponse>(
      "/api/v1/messages/requests/incoming",
    );
    return res.data.requests || [];
  };

  // ignoring pagination for now
  const fetchActiveThreads = async (): Promise<Thread[]> => {
    const res = await GET<ConversationInboxResponse>(
      "/api/v1/messages/threads",
    );
    return res.data.threads || [];
  };

  const sendMessageRequest = async (
    body: SendMessageRequestBody,
  ): Promise<any> => {
    const res = await POST("/api/v1/messages/requests", body);
    return res;
  };

  const acceptMessageRequest = async (requestId: string): Promise<any> => {
    const res = await POST(`/api/v1/messages/requests/${requestId}/accept`);
    return res;
  };

  const declineMessageRequest = async (requestId: string): Promise<any> => {
    const res = await POST(`/api/v1/messages/requests/${requestId}/decline`);
    return res;
  };

  return {
    sendMessageRequest,
    fetchOutgoingMessageRequests,
    fetchIncomingMessageRequests,
    fetchActiveThreads,
    acceptMessageRequest,
    declineMessageRequest,
  };
};
