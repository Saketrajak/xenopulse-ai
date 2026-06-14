from services.segmentation_service import (
    get_audience_insights
)

from services.ai_service import (
    generate_content
)

from services.campaign_service import (
    launch_campaign
)

from services.analytics_service import (
    get_campaign_metrics
)

from services.channel_strategy_service import (
    recommend_channel
)

LATEST_STRATEGY = {}

LATEST_CAMPAIGN_DRAFT = {}


def analyze_demo_data(goal):

    global LATEST_STRATEGY

    insights = get_audience_insights()

    channel_strategy = recommend_channel(
        goal
    )

    recommended_channel = (
        channel_strategy[
            "recommended_channel"
        ]
    )

    alternative_channels = (
        channel_strategy[
            "alternative_channels"
        ]
    )

    reasoning_prompt = f"""
You are a CRM strategist.

Business Goal:
{goal}

Audience:
{insights['audience_size']} inactive customers

Average Spend:
₹{insights['avg_spend']}

Recommended Channel:
{recommended_channel}

Alternative Channels:
{', '.join(alternative_channels)}

Explain:

1. Why the recommended channel is the best choice.
2. Why alternatives were not selected.
3. Expected business impact.

Keep the explanation under 120 words.
"""

    channel_reasoning = generate_content(
        reasoning_prompt
    )

    LATEST_STRATEGY = {

        "goal":
            goal,

        "channel":
            recommended_channel,

        "audience_size":
            min(
                insights["audience_size"],
                50
            )
    }

    return {

        "agent_state":
            "STRATEGY_READY",

        "thinking": {

            "customer_behavior":
                f"{insights['audience_size']} customers appear inactive",

            "value_assessment":
                f"Average customer spend is ₹{insights['avg_spend']}"
        },

        "decision": {

            "audience":
                f"{insights['audience_size']} inactive customers",

            "recommended_channel":
                recommended_channel,

            "alternative_channels":
                alternative_channels,

            "campaign_type":
                "Win-Back Campaign"
        },

        "action_plan": {

            "objective":
                "Re-engage inactive customers",

            "expected_impact":
                "Medium-High",

            "channel_reasoning":
                channel_reasoning,

            "next_step":
                "Choose campaign message source"
        },

        "actions": [

            "GENERATE_AI_CAMPAIGN",

            "UPLOAD_CUSTOM_MESSAGE"
        ]
    }


def generate_campaign_draft():

    global LATEST_CAMPAIGN_DRAFT

    channel = LATEST_STRATEGY.get(
        "channel",
        "WHATSAPP"
    )

    if channel == "WHATSAPP":

        prompt = """
You are a CRM strategist.

Create a WhatsApp win-back campaign.

Requirements:
- Conversational tone
- Friendly
- Use emojis
- Under 80 words
- Strong CTA

Generate:

Campaign Name:
...

Message:
...
"""

    elif channel == "SMS":

        prompt = """
You are a CRM strategist.

Create an SMS win-back campaign.

Requirements:
- Maximum 160 characters
- Very concise
- Strong CTA

Generate:

Campaign Name:
...

SMS:
...
"""

    elif channel == "EMAIL":

        prompt = """
You are a CRM strategist.

Create an Email win-back campaign.

Generate:

Campaign Name:
...

Subject:
...

Preview Text:
...

Body:
...

CTA:
...
"""

    else:

        prompt = """
You are a CRM strategist.

Create an RCS win-back campaign.

Generate:

Campaign Name:
...

Headline:
...

Body:
...

Hero Media Suggestion:
...

Buttons:
1.
2.
3.
"""

    ai_response = generate_content(
        prompt
    )

    LATEST_CAMPAIGN_DRAFT = {

        "campaign_name":
            "AI Generated Campaign",

        "channel":
            channel,

        "message":
            ai_response
    }

    return {

        "agent_state":
            "CAMPAIGN_DRAFT_READY",

        "recommended_channel":
            channel,

        "campaign_type":
            "Win-Back Campaign",

        "campaign_draft":
            ai_response,

        "requires_approval":
            True,

        "actions": [

            "APPROVE_CAMPAIGN",

            "UPLOAD_CUSTOM_MESSAGE"
        ]
    }


def save_custom_campaign(
    message
):

    global LATEST_CAMPAIGN_DRAFT

    channel = LATEST_STRATEGY.get(
        "channel"
    )

    if not channel:

        return {

            "error":
                "Please generate a strategy first."
        }

    LATEST_CAMPAIGN_DRAFT = {

        "campaign_name":
            "Custom Campaign",

        "channel":
            channel,

        "message":
            message
    }

    return {

        "agent_state":
            "CUSTOM_CAMPAIGN_READY",

        "channel":
            channel,

        "message":
            "Custom campaign saved successfully.",

        "requires_approval":
            True
    }


def approve_campaign():

    campaign_name = (
        LATEST_CAMPAIGN_DRAFT.get(
            "campaign_name",
            "Campaign"
        )
    )

    channel = (
        LATEST_CAMPAIGN_DRAFT.get(
            "channel",
            "WHATSAPP"
        )
    )

    audience_size = LATEST_STRATEGY.get(
        "audience_size",
        50
    )

    goal = LATEST_STRATEGY.get(
        "goal",
        "RETENTION"
    )

    result = launch_campaign(
        campaign_name=campaign_name,
        goal=goal,
        channel=channel,
        audience_size=audience_size
    )

    return {

        "agent_state":
            "CAMPAIGN_LAUNCHED",

        "message":
            f"Campaign launched via {channel}.",

        "campaign":
            result
    }


def generate_campaign_summary(
    campaign_id
):

    metrics = get_campaign_metrics(
        campaign_id
    )

    if metrics["total"] == 0:

        return {

            "agent_state":
                "CAMPAIGN_SUMMARY_READY",

            "message":
                "No communication data found for this campaign."
        }

    channel = LATEST_STRATEGY.get(
        "channel",
        "WHATSAPP"
    )

    summary_prompt = f"""
You are a senior CRM analyst.

Campaign Channel:
{channel}

Campaign Metrics:

Total Sent:
{metrics['total']}

Delivered:
{metrics['delivered']}

Opened:
{metrics['opened']}

Clicked:
{metrics['clicked']}

Converted:
{metrics['converted']}

Delivery Rate:
{metrics['delivery_rate']}%

Open Rate:
{metrics['open_rate']}%

Click Rate:
{metrics['click_rate']}%

Conversion Rate:
{metrics['conversion_rate']}%

Generate:

1. Executive Summary
2. What Worked
3. What Can Improve

Keep it concise.
"""

    global CAMPAIGN_SUMMARIES

    if campaign_id in CAMPAIGN_SUMMARIES:
        ai_summary = CAMPAIGN_SUMMARIES[campaign_id]
    else:
        ai_summary = generate_content(summary_prompt)
        if "AI Generation Error" not in ai_summary:
            CAMPAIGN_SUMMARIES[campaign_id] = ai_summary

    delivery_rate = metrics[
        "delivery_rate"
    ]

    conversion_rate = metrics[
        "conversion_rate"
    ]

    if (
        delivery_rate >= 80
        and
        conversion_rate >= 10
    ):

        campaign_health = "EXCELLENT"

    elif (
        delivery_rate >= 60
    ):

        campaign_health = "GOOD"

    elif (
        delivery_rate >= 30
    ):

        campaign_health = (
            "NEEDS_IMPROVEMENT"
        )

    else:

        campaign_health = "POOR"

    return {

        "agent_state":
            "CAMPAIGN_SUMMARY_READY",

        "campaign_health":
            campaign_health,

        "metrics":
            metrics,

        "summary":
            ai_summary
    }

def save_custom_campaign(
    message
):

    global LATEST_CAMPAIGN_DRAFT

    channel = LATEST_STRATEGY.get(
        "channel"
    )

    if not channel:

        return {

            "error":
                "Please generate a strategy first."
        }

    LATEST_CAMPAIGN_DRAFT = {

        "campaign_name":
            "Custom Campaign",

        "channel":
            channel,

        "message":
            message
    }

    return {

        "agent_state":
            "CUSTOM_CAMPAIGN_READY",

        "channel":
            channel,

        "message":
            "Custom campaign saved successfully.",

        "requires_approval":
            True
    }