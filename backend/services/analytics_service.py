from database.database import SessionLocal
from models.communication_log import CommunicationLog


def get_campaign_analytics(campaign_id):

    db = SessionLocal()

    try:

        logs = db.query(
            CommunicationLog
        ).filter(
            CommunicationLog.campaign_id ==
            (campaign_id)
        ).all()

        total = len(logs)

        if total == 0:

            return {
                "message": "Campaign not found"
            }

        delivered = len([
            log for log in logs
            if log.delivered_at
        ])

        opened = len([
            log for log in logs
            if log.opened_at
        ])

        clicked = len([
            log for log in logs
            if log.clicked_at
        ])

        converted = len([
            log for log in logs
            if log.converted_at
        ])

        return {

            "campaign_id": campaign_id,

            "sent": total,

            "delivered": delivered,

            "opened": opened,

            "clicked": clicked,

            "converted": converted,

            "delivery_rate":
                round(delivered / total * 100, 2),

            "open_rate":
                round(opened / delivered * 100, 2)
                if delivered else 0,

            "ctr":
                round(clicked / delivered * 100, 2)
                if delivered else 0,

            "conversion_rate":
                round(converted / total * 100, 2)
        }

    finally:

        db.close()


def get_campaign_metrics(campaign_id):

    db = SessionLocal()

    try:

        logs = db.query(
            CommunicationLog
        ).filter(
            CommunicationLog.campaign_id ==
            (campaign_id)
        ).all()

        total = len(logs)

        if total == 0:

            return {
                "total": 0,
                "delivered": 0,
                "opened": 0,
                "clicked": 0,
                "converted": 0,
                "delivery_rate": 0,
                "open_rate": 0,
                "click_rate": 0,
                "conversion_rate": 0
            }

        delivered = len([
            log for log in logs
            if log.delivered_at
        ])

        opened = len([
            log for log in logs
            if log.opened_at
        ])

        clicked = len([
            log for log in logs
            if log.clicked_at
        ])

        converted = len([
            log for log in logs
            if log.converted_at
        ])

        return {

            "total": total,

            "delivered": delivered,

            "opened": opened,

            "clicked": clicked,

            "converted": converted,

            "delivery_rate":
                round(
                    delivered * 100 / total,
                    2
                ),

            "open_rate":
                round(
                    opened * 100 / total,
                    2
                ),

            "click_rate":
                round(
                    clicked * 100 / total,
                    2
                ),

            "conversion_rate":
                round(
                    converted * 100 / total,
                    2
                )
        }

    finally:

        db.close()