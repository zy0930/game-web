# API Analysis Report

This document provides a comprehensive analysis of the current frontend implementation compared to the API documentation, identifying:
1. APIs currently integrated
2. APIs missing from documentation but expected (using mock data)
3. APIs in documentation but not yet implemented
4. Missing response status codes in API documentation

---

## Table of Contents
1. [Summary](#summary)
2. [Current Implementation Status](#current-implementation-status)
3. [Page-by-Page Analysis](#page-by-page-analysis)
4. [Missing APIs from Documentation](#missing-apis-from-documentation)
5. [Incomplete Response Specifications](#incomplete-response-specifications)
6. [Recommendations](#recommendations)

---

## Summary

| Category | Count |
|----------|-------|
| APIs Implemented & Working | 10 |
| APIs Using Mock Data (Missing from Docs) | 15+ |
| APIs in Docs but Not Implemented | 10+ |
| APIs with Incomplete Response Specs | 12 |

---

## Current Implementation Status

### Implemented API Services

Located in `src/lib/api/services/`:

| Service | API Endpoint | Status |
|---------|--------------|--------|
| **Discover** | `/api/mapidiscover/Discover` | Implemented |
| **Discover** | `/api/mapidiscover/DiscoverWOToken` | Implemented |
| **Discover** | `/api/mapidiscover/LaunchGame` | Implemented |
| **Discover** | `/api/mapidiscover/RefreshGame` | Implemented |
| **Discover** | `/api/mapidiscover/QuitGame` | Implemented |
| **Events** | `/api/mapievent/GetEvents` | Implemented |
| **Events** | `/api/mapievent/ClaimPromo` | Implemented |
| **Events** | `/api/MapiEvent/MuteAllCarousels` | Implemented |
| **Transactions** | `/api/mapiuser/GetTrans` | Implemented |
| **User** | `/api/mapiuser/GetQr` | Implemented (not used in UI yet) |
| **User** | `/api/mapibank/GetHaveBankAccount` | Implemented (not used in UI yet) |
| **User** | `/api/MapiDiscover/AboutUs` | Implemented (not used in UI yet) |

---

## Page-by-Page Analysis

### 1. Home Page (`src/app/page.tsx`)

**APIs Used:**
- `/api/mapidiscover/Discover` or `/api/mapidiscover/DiscoverWOToken`

**Mock Data Used:**
```typescript
// Mock user data (TODO: Replace with user profile API when available)
const userData = {
  username: "design111",
  avatar: "/avatar.png",
  isVerified: true,
  cashBalance: 128000.0,
  chipsBalance: 0.0,
  aPoints: 900,
};
```

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| User Profile | Get user profile with avatar, verification status | **NOT IN DOCS** |
| User Balance | Get cash/chips/points balance separately | **Partially in Discover response** |

**Notes:** The Discover API response includes `Cash`, `Chip`, `Point` fields when authenticated, which is good. However, there's no dedicated user profile API for avatar, username, verification status.

---

### 2. Account Page (`src/app/account/page.tsx`)

**APIs Used:** None (all mock data)

**Mock Data Used:**
```typescript
const userData = {
  avatar: "/avatar.png",
  username: "design111",
  uid: "12345ye123",
  status: "pending", // pending, verified, rejected
  cashBalance: 126000.00,
  chipsBalance: 0.00,
  overview: {
    date: "2025 Nov 13",
    registered: 10,
    activePlayer: 12,
    turnover: 138.00,
  },
};
```

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| User Profile | GET user profile (avatar, username, uid, KYC status) | **NOT IN DOCS** |
| User Balance | GET user balance | **NOT IN DOCS** (separate endpoint) |
| Account Overview | GET account statistics (registered, active players, turnover) | **NOT IN DOCS** |

---

### 3. Event Page (`src/app/event/page.tsx`)

**APIs Used:**
- `/api/mapievent/GetEvents`
- `/api/mapievent/ClaimPromo`

**Status:** Properly integrated with API

**Missing from API Response:**
| Field | Description | Status |
|-------|-------------|--------|
| Category | Event category for filtering | **NOT IN DOCS** |

---

### 4. Transaction Page (`src/app/transaction/page.tsx`)

**APIs Used:**
- `/api/mapiuser/GetTrans`

**Status:** Properly integrated with API

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Filter by Type | API should support filtering by transaction type (deposit/withdrawal/transfer/bonus) | **NOT IN DOCS** |

---

### 5. Deposit Page (`src/app/deposit/page.tsx`)

**APIs Used:** None (all mock data)

**Mock Data Used:**
```typescript
const walletData = {
  cashBalance: 126000.0,
  chipsBalance: 0.0,
};
```

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Get Balance | GET user wallet balance | **NOT IN DOCS** (separate endpoint) |

---

### 6. Deposit - Instant (`src/app/deposit/instant/page.tsx`)

**APIs Used:** None (all mock data)

**Mock Data Used:**
```typescript
const paymentMethods = [...]; // Fpay, Super Pay, Ok2Pay, etc.
const banks = [...]; // List of banks
const promotions = [...]; // Available promotions
```

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Get Payment Methods | GET available payment gateways | **NOT IN DOCS** |
| Get Banks | GET available banks for selected gateway | **NOT IN DOCS** |
| Get Promotions | GET available promotions for deposit | **NOT IN DOCS** |
| Submit Deposit | POST create instant deposit request | **NOT IN DOCS** |
| Validate Promo Code | POST validate promotion code | **NOT IN DOCS** |

---

### 7. Deposit - Bank Transfer (`src/app/deposit/bank/page.tsx`)

**APIs Used:** None (all mock data)

**Mock Data Used:**
```typescript
const bankAccounts = [
  {
    id: "bankislam",
    name: "Bank Islam",
    accountName: "Restoran 36",
    accountNo: "14069010051044",
  },
  // ...
];
```

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Get Company Bank Accounts | GET company bank accounts for transfer | **NOT IN DOCS** |
| Submit Bank Transfer | POST create bank transfer deposit with receipt | **NOT IN DOCS** |

---

### 8. Deposit - E-Wallet (`src/app/deposit/ewallet/page.tsx`)

**APIs Used:** None (all mock data)

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Get E-Wallet Options | GET available e-wallet types | **NOT IN DOCS** |
| Submit E-Wallet Deposit | POST create e-wallet deposit | **NOT IN DOCS** |

---

### 9. Deposit - Crypto (`src/app/deposit/crypto/page.tsx`)

**APIs Used:** None (all mock data)

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Get Crypto Options | GET available crypto currencies | **NOT IN DOCS** |
| Get Exchange Rate | GET current exchange rate | **NOT IN DOCS** |
| Submit Crypto Deposit | POST create crypto deposit | **NOT IN DOCS** |

---

### 10. Withdrawal Page (`src/app/withdrawal/page.tsx`)

**APIs Used:** None (all mock data)

**Mock Data Used:**
```typescript
const userData = {
  cashBalance: 126000.0,
  turnover: 0.0,
  turnoverTarget: 55.0,
};

const bankAccounts = [
  {
    id: "bankislam",
    name: "Bank Islam",
    accountName: "Designer",
    accountNo: "14069010051044",
  },
];
```

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Get User Bank Accounts | GET user's registered bank accounts | **NOT IN DOCS** |
| Get Withdrawal Balance | GET available balance for withdrawal | **NOT IN DOCS** |
| Get Turnover Status | GET current turnover vs target | **NOT IN DOCS** |
| Submit Withdrawal | POST create withdrawal request | **NOT IN DOCS** |
| Validate PIN | POST validate withdrawal PIN | **NOT IN DOCS** |

---

### 11. Referral Page (`src/app/referral/page.tsx`)

**APIs Used:** None (all mock data)

**Mock Data Used:**
```typescript
const userData = {
  avatar: "/avatar.png",
  username: "design111",
  uid: "12345ye123",
  referralCode: "1234678",
  referralLink: "https://www.aonedl.com/?R=273B84",
};
```

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Get User Referral Info | GET user's referral code and link | **NOT IN DOCS** |
| Get User QR Code | `/api/mapiuser/GetQr` | **IN DOCS** (not integrated) |

---

### 12. Inbox Page (`src/app/account/inbox/page.tsx`)

**APIs Used:** None (all mock data)

**Mock Data Used:**
```typescript
const initialSystemMessages: Message[] = [...];
const initialPersonalMessages: Message[] = [...];
```

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Get System Messages | GET system inbox messages | **NOT IN DOCS** |
| Get Personal Messages | GET personal inbox messages | **NOT IN DOCS** |
| Mark Message Read | POST mark message as read | **NOT IN DOCS** |
| Delete Message | DELETE remove message | **NOT IN DOCS** |

---

### 13. Register Page (`src/app/(auth)/register/page.tsx`)

**APIs Used:**
- `/api/auth/register` (internal mock route)

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Register User | `/api/mapiuser/Register` | **IN DOCS** (not integrated) |
| Get Send To Options | `/api/mapiuser/Register_GetSendToOptions` | **IN DOCS** (not integrated) |
| Get Upline | `/api/mapiuser/Register_GetUpline` | **IN DOCS** (not integrated) |
| Request OTP | OTP request endpoint | **NOT IN DOCS** |
| Verify OTP | OTP verification endpoint | **NOT IN DOCS** |

---

### 14. Login (Auth Provider) (`src/providers/auth-provider.tsx`)

**APIs Used:**
- `/api/auth/login` (internal mock route)

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Login | External API login endpoint | **NOT IN DOCS** |
| Token Refresh | Refresh access token | **NOT IN DOCS** |

---

### 15. Forgot Password Page (`src/app/(auth)/forgot-password/page.tsx`)

**APIs Used:** None

**Missing APIs:**
| Feature | Expected API | Status |
|---------|--------------|--------|
| Request Password Reset OTP | Request OTP for password reset | **NOT IN DOCS** |
| Reset Password | Submit new password with OTP | **NOT IN DOCS** |

---

### 16. About Page (`src/app/about/page.tsx`)

**APIs Used:** None (content from i18n translations)

**Available API:**
- `/api/MapiDiscover/AboutUs` - **IN DOCS** (service exists but not used in UI)

---

## Missing APIs from Documentation

### Critical Missing APIs (Required for Core Functionality)

| Priority | Feature | Expected Endpoint | Notes |
|----------|---------|-------------------|-------|
| **HIGH** | Login | POST `/api/mapiuser/Login` | No login endpoint documented |
| **HIGH** | Get User Profile | GET `/api/mapiuser/GetProfile` | Required for account page, header |
| **HIGH** | Submit Deposit | POST `/api/mapibank/Deposit` | All deposit methods need this |
| **HIGH** | Submit Withdrawal | POST `/api/mapibank/Withdraw` | Withdrawal flow incomplete |
| **HIGH** | Get User Bank Accounts | GET `/api/mapibank/GetBankAccounts` | For withdrawal bank selection |
| **HIGH** | Get Payment Methods | GET `/api/mapibank/GetPaymentMethods` | For deposit options |
| **HIGH** | Get Inbox Messages | GET `/api/mapiuser/GetInbox` | Inbox is fully mocked |
| **MEDIUM** | Get Promotions | GET `/api/mapievent/GetPromotions` | Deposit promo selection |
| **MEDIUM** | Request OTP | POST `/api/mapiuser/RequestOTP` | Registration, forgot password |
| **MEDIUM** | Verify OTP | POST `/api/mapiuser/VerifyOTP` | Registration, forgot password |
| **MEDIUM** | Reset Password | POST `/api/mapiuser/ResetPassword` | Forgot password flow |
| **MEDIUM** | Get Referral Info | GET `/api/mapiuser/GetReferralInfo` | Referral page |
| **LOW** | Get Account Overview | GET `/api/mapiuser/GetOverview` | Account statistics |

---

## Incomplete Response Specifications

The following APIs only show success responses in the documentation but don't specify error scenarios:

### APIs with Missing Error Response Examples

| API | Documented Response | Missing Scenarios |
|-----|---------------------|-------------------|
| **Quit Game** | Only `Code: 0, Message: "Success"` | - No active game session (Code: ?) <br> - Session already ended (Code: ?) |
| **Launch Game** | Only success response | - Game under maintenance (Code: ?) <br> - Insufficient balance (Code: ?) <br> - Game not found (Code: ?) |
| **Refresh Game** | Only success response | - Session expired (Code: ?) <br> - Invalid game ID (Code: ?) |
| **Claim Promo** | Only success response | - Already claimed (Code: ?) <br> - Promo expired (Code: ?) <br> - Ineligible user (Code: ?) |
| **Mute All Carousels** | Only success response | - Invalid device ID (Code: ?) |
| **Add Bank Account** | Only success response | - Invalid TAC (Code: ?) <br> - Bank not supported (Code: ?) <br> - Duplicate account (Code: ?) |
| **Change Phone** | Only success response | - Invalid TAC (Code: ?) <br> - Phone already registered (Code: ?) |
| **Register** | Only success response | - Username taken (Code: ?) <br> - Phone already registered (Code: ?) <br> - Invalid referral code (Code: ?) |
| **Send Contact Request** | Only success response | - User not found (Code: ?) <br> - Already friends (Code: ?) |
| **Approve Contact** | Only success response | - Request not found (Code: ?) <br> - Request expired (Code: ?) |
| **Cancel Contact** | Only success response | - Contact not found (Code: ?) |
| **Get TAC (Add Bank)** | Only success response | - Rate limit exceeded (Code: ?) <br> - Invalid phone (Code: ?) |

### APIs Missing HTTP Status Code Variations

All APIs only document HTTP 200 for success and mention generic 400+ for errors. Specific scenarios needed:

| HTTP Status | When It Should Occur |
|-------------|---------------------|
| 400 | Validation errors (specific field errors) |
| 401 | Token expired / not provided |
| 403 | User not authorized for this action |
| 404 | Resource not found |
| 409 | Conflict (duplicate resource) |
| 422 | Unprocessable entity (business rule violation) |
| 429 | Rate limit exceeded |

---

## Recommendations

### For Backend Team

1. **Document Login API** - Critical for authentication flow
2. **Document User Profile API** - Required for account/header display
3. **Document Deposit/Withdrawal APIs** - Complete the money flow
4. **Document Inbox APIs** - Messages are fully mocked
5. **Add Error Response Examples** - Include all possible error codes and messages

### For Frontend Team

1. **Integrate Existing APIs:**
   - Connect About page to `/api/MapiDiscover/AboutUs`
   - Connect Referral page to `/api/mapiuser/GetQr`
   - Connect Register page to documented register APIs

2. **Replace Mock Data** - Once APIs are documented, replace:
   - User profile data
   - Wallet balance data
   - Bank accounts data
   - Inbox messages data

3. **Add Error Handling** - Prepare for various error codes once documented

### Priority Order for API Documentation

1. **Immediate:** Login, User Profile, Deposit, Withdrawal
2. **Next Sprint:** Inbox, OTP flows, Promotions
3. **Later:** Game Records (already documented), Contacts (already documented)

---

## Appendix: API Implementation Checklist

### Services That Need to Be Created

```typescript
// src/lib/api/services/auth.ts
- login(credentials)
- refreshToken()
- requestOTP()
- verifyOTP()
- resetPassword()

// src/lib/api/services/profile.ts (new)
- getProfile()
- updateProfile()
- getBalance()
- getOverview()

// src/lib/api/services/deposit.ts (new)
- getPaymentMethods()
- getBanks(methodId)
- getCompanyBankAccounts()
- getPromotions()
- submitDeposit()
- validatePromoCode()

// src/lib/api/services/withdrawal.ts (new)
- getWithdrawalInfo()
- getUserBankAccounts()
- submitWithdrawal()
- validatePIN()

// src/lib/api/services/inbox.ts (new)
- getSystemMessages()
- getPersonalMessages()
- markAsRead()
- deleteMessage()

// src/lib/api/services/referral.ts (new)
- getReferralInfo()
```

---

*Last Updated: January 6, 2026*
*Generated by: API Analysis Tool*
