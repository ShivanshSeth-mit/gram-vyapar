# Security Specification: Gram Vyapar Firestore Access Control

## 1. Data Invariants
- **Identity Invariant**: A user document at `/users/{userId}` can only be read or written by the authenticated user matching `userId == request.auth.uid`.
- **Integrity Invariant**: Saved reports and feedback records must have `userId == request.auth.uid` and are housed as direct subcollections of `/users/{userId}`.
- **Relational Access Invariant**: Subcollection records cannot be created under a different user's path.
- **Immutability Invariant**: Key identity parameters (`userId`, `id`, `createdAt`) cannot be mutated upon update operations.

## 2. The Dirty Dozen Attack Payloads
1. `MaliciousUserSpoof`: Attacker sends payload with `userId: "admin_account"` to hijack another user's profile. (Rejected: `userId == request.auth.uid` validation).
2. `JunkIdPoisoning`: Attacker sends an excessively long / malformed path parameter for `{userId}` or `{reportId}`. (Rejected: `isValidId()` regex and length guard).
3. `GhostFieldInjection`: Attacker attempts to inject hidden escalation fields (e.g. `role: "super_admin"`). (Rejected: enum validation on `role`).
4. `OrphanedReportInjection`: Attacker tries to save a report under `/users/other_user_id/reports/rep_1`. (Rejected: `isOwner(userId)` checks `request.auth.uid == userId`).
5. `NegativeMarginMoney`: Attacker tries to write a report with negative numbers for capital/project cost. (Rejected: `>= 0` check).
6. `RatingPoisoning`: Attacker sends rating value `10` or `-1`. (Rejected: `rating >= 1 && rating <= 5`).
7. `CreatedAtTampering`: Attacker tries to alter `createdAt` on an existing report during update. (Rejected: `incoming().createdAt == existing().createdAt`).
8. `ExcessivePayloadDenial`: Attacker submits a 50KB comment string. (Rejected: string length check `<= 1000`).
9. `UnauthenticatedRead`: Unauthenticated client attempts `get` or `list` on `/users/{userId}/reports`. (Rejected: `isSignedIn()` guard).
10. `UserCrossListScrape`: Authenticated user A queries `/users/{userB_id}/reports`. (Rejected: `isOwner(userId)`).
11. `FeedbackMutation`: User attempts to alter a submitted feedback via `update`. (Rejected: `allow update: if false`).
12. `ProfileSelfDeletion`: User attempts `delete` on root user profile. (Rejected: `allow delete: if false`).
