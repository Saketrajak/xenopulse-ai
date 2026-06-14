from fastapi import FastAPI

from database.database import engine, Base

from models.customer import Customer
from models.order import Order
from models.campaign import Campaign
from models.communication_log import CommunicationLog
from routes.demo import router as demo_router
from routes.stats import router as stats_router
from routes.campaigns import router as campaign_router
from routes.audience import router as audience_router
from routes.launch import router as launch_router
from routes.communications import router as communications_router
from routes.agent import router as agent_router
app = FastAPI(
    title="XenoPulse AI"
)

Base.metadata.create_all(bind=engine)
app.include_router(demo_router)
app.include_router(stats_router)
app.include_router(campaign_router)
app.include_router(audience_router)
app.include_router(launch_router)
app.include_router(communications_router)
app.include_router(agent_router)
@app.get("/")
def root():
    return {
        "message": "XenoPulse AI Backend Running"
    }