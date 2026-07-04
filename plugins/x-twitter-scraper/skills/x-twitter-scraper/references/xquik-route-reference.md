# Xquik Route Reference

Use this bundled reference for endpoint selection when live docs are unavailable.
Prefer the narrowest route family that satisfies the user's request, then verify
exact parameters against live docs or `https://xquik.com/openapi.json` when the
environment allows network access.

## Public Read Workflows

| Need | Route Family |
| --- | --- |
| Search tweets by query, Tweet ID, status URL, or account date window | `GET /api/v1/x/tweets/search` |
| Fetch specific tweets | `GET /api/v1/x/tweets` or `GET /api/v1/x/tweets/{id}` |
| Fetch a conversation | `GET /api/v1/x/tweets/{id}/thread` |
| Fetch replies, quotes, retweeters, or favoriters | `GET /api/v1/x/tweets/{id}/replies`, `/quotes`, `/retweeters`, `/favoriters` |
| Search or look up users | `GET /api/v1/x/users/search`, `/users/batch`, `/users/{id}` |
| Fetch user timelines | `GET /api/v1/x/users/{id}/tweets`, `/replies`, `/media`, `/mentions` |
| Fetch followers, following, or verified followers | `GET /api/v1/x/users/{id}/followers`, `/following`, `/verified-followers` |
| Check follower relationship | `GET /api/v1/x/followers/check` |
| Fetch trends | `GET /api/v1/x/trends` |
| Fetch list content | `GET /api/v1/x/lists/{id}/tweets`, `/members`, `/followers` |
| Fetch community content | `GET /api/v1/x/communities/{id}/info`, `/tweets`, `/members`, `/moderators` |
| Search communities | `GET /api/v1/x/communities/search` |
| Fetch long-form article content | `GET /api/v1/x/articles/{tweetId}` |

## Account-Scoped Read Workflows

Require an Xquik API key and usually a connected account. Ask for explicit user
approval before private reads.

| Need | Route Family |
| --- | --- |
| List connected X accounts | `GET /api/v1/x/accounts` |
| Fetch bookmarks or bookmark folders | `GET /api/v1/x/bookmarks`, `/bookmarks/folders` |
| Fetch home timeline or notifications | `GET /api/v1/x/timeline`, `/notifications` |
| Fetch DM history | `GET /api/v1/x/dm/{userId}/history` |
| Fetch mutual followers | `GET /api/v1/x/users/{id}/followers-you-know` |

## Write And Media Workflows

Ask for explicit confirmation before write actions. Confirm the target account,
text, media, and destructive intent where relevant.

| Need | Route Family |
| --- | --- |
| Create, delete, like, unlike, retweet, or unretweet | `POST /api/v1/x/tweets`, `DELETE /api/v1/x/tweets/{id}`, `/like`, `/retweet` |
| Check write status | `GET /api/v1/x/write-actions/{id}` |
| Follow, unfollow, or remove follower | `POST /api/v1/x/users/{id}/follow`, `DELETE /api/v1/x/users/{id}/follow`, `POST /api/v1/x/users/{id}/remove-follower` |
| Send a direct message | `POST /api/v1/x/dm/{userId}` |
| Upload or download media | `POST /api/v1/x/media`, `/media/download` |
| Update profile fields, avatar, or banner | `PATCH /api/v1/x/profile`, `/profile/avatar`, `/profile/banner` |
| Join, leave, create, or delete communities | `POST /api/v1/x/communities`, `/communities/{id}/join`; `DELETE /api/v1/x/communities/{id}`, `/join` |

## Automation, Export, And Integration Workflows

| Need | Route Family |
| --- | --- |
| Compose, refine, or score tweet text | `POST /api/v1/compose` |
| Save or manage drafts | `GET /api/v1/drafts`, `POST /api/v1/drafts`, `GET` or `DELETE /api/v1/drafts/{id}` |
| Analyze or compare writing styles | `GET /api/v1/styles`, `POST /api/v1/styles`, `/styles/compare`, `/styles/{id}` |
| Create account or keyword monitors | `GET` or `POST /api/v1/monitors`, `/monitors/keywords` |
| Update or delete monitors | `GET`, `PATCH`, or `DELETE /api/v1/monitors/{id}`, `/monitors/keywords/{id}` |
| List event stream records | `GET /api/v1/events`, `/events/{id}` |
| Run extraction jobs | `GET` or `POST /api/v1/extractions`, `/extractions/estimate`, `/extractions/{id}`, `/export` |
| Manage webhooks | `GET` or `POST /api/v1/webhooks`, `PATCH` or `DELETE /api/v1/webhooks/{id}` |
| Inspect webhook delivery or send a test | `GET /api/v1/webhooks/{id}/deliveries`, `POST /api/v1/webhooks/{id}/test`, `/resume` |

## Selection Rules

- Prefer search routes for discovery and ID routes for known entities.
- Prefer monitor routes for persistent polling instead of repeated ad hoc loops.
- Prefer webhook routes when the target system needs event delivery.
- Prefer extraction routes for batch jobs and exports.
- Prefer MCP setup when an agent should call Xquik tools directly.
- Do not invent parameters or response fields if live docs are unavailable.
