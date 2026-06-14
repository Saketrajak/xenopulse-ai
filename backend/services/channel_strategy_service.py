def recommend_channel(goal):

    channels = {

        "WHATSAPP": {
            "engagement_score": 90,
            "delivery_score": 95,
            "conversion_score": 75
        },

        "SMS": {
            "engagement_score": 60,
            "delivery_score": 92,
            "conversion_score": 45
        },

        "EMAIL": {
            "engagement_score": 40,
            "delivery_score": 88,
            "conversion_score": 35
        },

        "RCS": {
            "engagement_score": 95,
            "delivery_score": 97,
            "conversion_score": 85
        }
    }

    best_channel = max(
        channels,
        key=lambda channel:
            channels[channel]["engagement_score"]
            +
            channels[channel]["conversion_score"]
    )

    alternatives = [
        channel
        for channel in channels
        if channel != best_channel
    ]

    return {

        "recommended_channel":
            best_channel,

        "alternative_channels":
            alternatives,

        "channel_scores":
            channels
    }