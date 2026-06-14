from fastapi import APIRouter
from pydantic import BaseModel

from services.agent_service import (
    analyze_demo_data,
    generate_campaign_draft,
    approve_campaign,
    generate_campaign_summary,
    save_custom_campaign
)

router = APIRouter()



class ChatRequest(BaseModel):
    message: str


class CampaignSummaryRequest(BaseModel):
    campaign_id: int

class CustomCampaignRequest(
    BaseModel
):

    message: str

@router.post("/agent/chat")
def chat(request: ChatRequest):

    message = request.message.lower()

    if (
        "repeat purchase" in message
        or "retention" in message
    ):

        return {
            "goal": "RETENTION",
            "agent_state": "NEEDS_DATA",
            "message":
                "I can help investigate repeat purchases. Would you like to upload customer data or use demo data?",
            "actions": [
                "UPLOAD_DATA",
                "USE_DEMO_DATA"
            ]
        }

    elif (
        "inactive" in message
        or "winback" in message
    ):

        return {
            "goal": "WINBACK",
            "agent_state": "NEEDS_DATA",
            "message":
                "I found a win-back opportunity. Would you like to upload customer data or use demo data?",
            "actions": [
                "UPLOAD_DATA",
                "USE_DEMO_DATA"
            ]
        }

    return {

        "goal": "UNKNOWN",

        "agent_state":
            "NEEDS_CLARIFICATION",

        "message":
            "Can you tell me more about the business problem you are trying to solve?"
    }


@router.post("/agent/use-demo")
def use_demo():

    return analyze_demo_data(
        goal="RETENTION"
    )


@router.post("/agent/generate-campaign")
def generate_campaign():

    return generate_campaign_draft()


@router.post("/agent/approve-campaign")
def approve():

    return approve_campaign()


@router.post("/agent/campaign-summary")
def campaign_summary(
    request: CampaignSummaryRequest
):

    return generate_campaign_summary(
        request.campaign_id
    )

@router.post(
    "/agent/custom-campaign"
)

def custom_campaign(
    request: CustomCampaignRequest
):

    return save_custom_campaign(
        request.message
    )