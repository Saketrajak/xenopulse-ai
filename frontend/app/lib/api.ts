export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text?: string;
  cardType?: "retention" | "strategy" | "campaign" | "result";
  cardData?: any;
  actions?: string[];
}

export interface ChatResponse {
  goal: string;
  agent_state: string;
  message: string;
  actions?: string[];
}

export interface StrategyResponse {
  agent_state: string;
  thinking: {
    customer_behavior: string;
    value_assessment: string;
  };
  decision: {
    audience: string;
    recommended_channel: string;
    alternative_channels: string[];
    campaign_type: string;
  };
  action_plan: {
    objective: string;
    expected_impact: string;
    channel_reasoning: string;
    next_step: string;
  };
  actions?: string[];
}

export interface CampaignDraftResponse {
  agent_state: string;
  recommended_channel: string;
  campaign_type: string;
  campaign_draft: string;
  requires_approval: boolean;
  actions?: string[];
}

export interface CustomCampaignResponse {
  agent_state: string;
  channel: string;
  message: string;
  requires_approval: boolean;
}

export interface LaunchCampaignResponse {
  agent_state: string;
  message: string;
  campaign: {
    campaign_id: number;
    campaign_name: string;
    audience_size: number;
    logs_created: number;
    status: string;
  };
}

export interface CampaignSummaryResponse {
  agent_state: string;
  campaign_health?: "EXCELLENT" | "GOOD" | "NEEDS_IMPROVEMENT" | "POOR";
  metrics?: {
    total: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    delivery_rate: number;
    open_rate: number;
    click_rate: number;
    conversion_rate: number;
  };
  summary?: string;
  message?: string;
}

const apiFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

export const chatWithAgent = async (message: string): Promise<ChatResponse> => {
  return apiFetch<ChatResponse>("/api/agent/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};

export const useDemoData = async (): Promise<StrategyResponse> => {
  return apiFetch<StrategyResponse>("/api/agent/use-demo", {
    method: "POST",
  });
};

export const generateAICampaign = async (): Promise<CampaignDraftResponse> => {
  return apiFetch<CampaignDraftResponse>("/api/agent/generate-campaign", {
    method: "POST",
  });
};

export const saveCustomCampaign = async (
  message: string
): Promise<CustomCampaignResponse> => {
  return apiFetch<CustomCampaignResponse>("/api/agent/custom-campaign", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};

export const approveAndLaunchCampaign = async (): Promise<LaunchCampaignResponse> => {
  return apiFetch<LaunchCampaignResponse>("/api/agent/approve-campaign", {
    method: "POST",
  });
};

export const getCampaignSummary = async (
  campaignId: number
): Promise<CampaignSummaryResponse> => {
  return apiFetch<CampaignSummaryResponse>("/api/agent/campaign-summary", {
    method: "POST",
    body: JSON.stringify({ campaign_id: campaignId }),
  });
};
