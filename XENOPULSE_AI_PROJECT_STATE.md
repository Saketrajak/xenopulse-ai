# XenoPulse AI CRM

## Project Vision

An AI-first CRM where marketers describe business goals in natural language and the AI helps them think, decide, and act.

Example:

"Bring back inactive customers."

↓

AI analyzes customer data

↓

AI recommends audience and channel

↓

AI generates campaign

OR

Marketer uploads custom campaign

↓

Campaign launch

↓

Analytics summary

---

## Architecture

Marketer
↓
AI Agent
↓
Business Goal
↓
Data Analysis Engine
↓
Audience Discovery
↓
Channel Recommendation
↓
Campaign Generation
↓
Human Approval
↓
Campaign Launch
↓
Channel Service
↓
Analytics Engine
↓
AI Summary

---

## Supported Channels

- WhatsApp
- SMS
- Email
- RCS

---

## Backend Stack

- FastAPI
- SQLite
- SQLAlchemy
- Gemini 2.5 Flash

---

## Frontend Stack

- Next.js

---

## Completed Backend Features

### AI Agent

POST /agent/chat

Detects:

- RETENTION
- WINBACK

---

### Strategy Generation

POST /agent/use-demo

Returns:

- audience insights
- recommended channel
- alternative channels
- AI reasoning
- expected impact

---

### AI Campaign Generation

POST /agent/generate-campaign

Generates channel-specific campaigns:

- WhatsApp
- SMS
- Email
- RCS

---

### Custom Campaign

POST /agent/custom-campaign

Allows marketer to paste custom campaign content.

---

### Campaign Approval

POST /agent/approve-campaign

Launches campaign using:

- selected channel
- selected audience

---

### Campaign Analytics

POST /agent/campaign-summary

Returns:

- metrics
- campaign health
- AI-generated summary

---

## Important Product Decisions

### Keep

- Chat-first experience
- AI recommends channel
- AI generates campaigns
- Marketer can use custom campaign
- Human approval before launch

### Do NOT Build

- Autonomous follow-up campaigns
- Auto audience refinement
- Auto channel switching
- Multi-step autonomous agent loops

Keep workflow simple.

---

## Current User Journey

Marketer Goal

↓

Use Demo Data

↓

AI Analysis

↓

Generate AI Campaign
OR
Upload Custom Campaign

↓

Approve Campaign

↓

Launch

↓

Analytics Summary

---

## Current Status

Backend completed and tested.

All endpoints working.

Next milestone:

Build chat-first frontend in Next.js.

---

## Frontend Goal

Single chat interface.

No dashboard-first design.

Example:

User:
Bring back inactive customers.

AI:
I found a retention opportunity.

[Upload Data]
[Use Demo Data]

↓

AI Strategy Card

↓

[Generate AI Campaign]
[Use My Own Message]

↓

Campaign Preview

↓

[Approve Campaign]

↓

Campaign Results