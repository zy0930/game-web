# API Documentation - C9 App

## Configuration

**BaseUrl Reference in Code:** Defined in `lib/main.dart`
```dart
const String domain = 'https://a1bo-qa.azurewebsites.net'; // QA Environment
```

**Base URL:** `{domain}` (Example: `https://a1bo-qa.azurewebsites.net`)

---

## Global Headers
All API requests should include:
```
Accept: application/json
Content-Type: application/json (for POST requests)
Authorization: bearer {AccessToken} (for authenticated endpoints)
Lang: {LanguageCode} (e.g., 'en', 'zh')
```

---

## API Endpoints by Screen

### 1. About Us Screen
**File:** `lib/screens/about.dart`

#### API: Get About Us Content
- **Method:** GET
- **Endpoint:** `/api/MapiDiscover/AboutUs`
- **Full URL:** `{domain}/api/MapiDiscover/AboutUs`
- **Headers:**
  - `Accept: application/json`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Content": "string - About us page content"
}
```
- **Status Codes:**
  - 200: Success
  - 400+: Error

---

### 2. Games Screen (T1 Games)
**File:** `lib/screens/t1_games.dart`

#### API: Get Discover Games (With Token)
- **Method:** GET
- **Endpoint:** `/api/mapidiscover/Discover`
- **Full URL:** `{domain}/api/mapidiscover/Discover?Platform={Platform}`
- **Parameters:** 
  - `Platform`: Android | IOS | Web
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Data": {
    "GameCategories": [
      {
        "Id": "string",
        "Name": "string",
        "Games": [
          {
            "Id": "string",
            "Name": "string",
            "Image": "string"
          }
        ]
      }
    ]
  }
}
```

#### API: Get Discover Games (Without Token)
- **Method:** GET
- **Endpoint:** `/api/mapidiscover/DiscoverWOToken`
- **Full URL:** `{domain}/api/mapidiscover/DiscoverWOToken?Platform={Platform}`
- **Parameters:** 
  - `Platform`: Android | IOS | Web
- **Headers:**
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:** Same as above

#### API: Launch Game
- **Method:** GET
- **Endpoint:** `/api/mapidiscover/LaunchGame`
- **Full URL:** `{domain}/api/mapidiscover/LaunchGame?Id={GameId}&Platform={Platform}`
- **Parameters:**
  - `Id`: Game ID
  - `Platform`: Android | IOS | Web
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Id": "string",
  "GameName": "string",
  "LaunchType": "Webview | Browser | App",
  "Url": "string",
  "Code": 0,
  "Message": "string"
}
```

#### API: Refresh Game
- **Method:** GET
- **Endpoint:** `/api/mapidiscover/RefreshGame`
- **Full URL:** `{domain}/api/mapidiscover/RefreshGame?Id={GameId}`
- **Parameters:**
  - `Id`: Game ID
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Url": "string"
}
```

#### API: Quit Game
- **Method:** GET
- **Endpoint:** `/api/mapidiscover/QuitGame`
- **Full URL:** `{domain}/api/mapidiscover/QuitGame?Platform={Platform}`
- **Parameters:**
  - `Platform`: Android | IOS | Web
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

---

### 3. Events Screen (T2 Events)
**File:** `lib/screens/t2_events.dart`

#### API: Get Events
- **Method:** GET
- **Endpoint:** `/api/mapievent/GetEvents`
- **Full URL:** `{domain}/api/mapievent/GetEvents`
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Data": [
    {
      "Id": "string",
      "Name": "string",
      "Description": "string",
      "StartDate": "datetime",
      "EndDate": "datetime",
      "PromoImage": "string"
    }
  ]
}
```

#### API: Claim Promo
- **Method:** POST
- **Endpoint:** `/api/mapievent/ClaimPromo`
- **Full URL:** `{domain}/api/mapievent/ClaimPromo`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "Id": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

#### API: Mute All Carousels
- **Method:** POST
- **Endpoint:** `/api/MapiEvent/MuteAllCarousels`
- **Full URL:** `{domain}/api/MapiEvent/MuteAllCarousels`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "DeviceId": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

---

### 4. Transactions Screen (T3 Trans)
**File:** `lib/screens/trans.dart`

#### API: Get Transactions
- **Method:** GET
- **Endpoint:** `/api/mapiuser/GetTrans`
- **Full URL:** `{domain}/api/mapiuser/GetTrans?Page={Page}&DateFrom={DateFrom}&DateTo={DateTo}`
- **Parameters:**
  - `Page`: Page number (1, 2, ...)
  - `DateFrom`: Date from (optional)
  - `DateTo`: Date to (optional)
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Page": 1,
  "End": false,
  "Rows": [
    {
      "Id": "string",
      "Type": "string",
      "Amount": 0.00,
      "Balance": 0.00,
      "CreatedDate": "datetime",
      "Description": "string"
    }
  ]
}
```

---

### 5. Account Screen (T4 Account)
**File:** `lib/screens/t4_account.dart`

#### API: Get My QR Code
- **Method:** GET
- **Endpoint:** `/api/mapiuser/GetQr`
- **Full URL:** `{domain}/api/mapiuser/GetQr`
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "QrCode": "string - Base64 encoded QR image"
}
```

---

### 6. Deposit Screen
**File:** `lib/screens/deposit.dart`

#### API: Get Have Bank Account
- **Method:** GET
- **Endpoint:** `/api/mapibank/GetHaveBankAccount`
- **Full URL:** `{domain}/api/mapibank/GetHaveBankAccount`
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Have": true|false
}
```

---

### 7. Game Records Screen
**File:** `lib/screens/gamerecords.dart`

#### API: Get Game Records Game Selections
- **Method:** GET
- **Endpoint:** `/api/mapireport/GetGameRecordsGameSelections`
- **Full URL:** `{domain}/api/mapireport/GetGameRecordsGameSelections`
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Data": [
    {
      "Id": "string",
      "Name": "string",
      "Image": "string"
    }
  ]
}
```

#### API: Get Game Records
- **Method:** GET
- **Endpoint:** `/api/mapireport/GetGameRecords`
- **Full URL:** `{domain}/api/mapireport/GetGameRecords?GameId={GameId}&DateFrom={DateFrom}&DateTo={DateTo}&Page={Page}`
- **Parameters:**
  - `GameId`: Game ID (optional)
  - `DateFrom`: Date from (optional)
  - `DateTo`: Date to (optional)
  - `Page`: Page number (1, 2, ...)
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Page": 1,
  "End": false,
  "Rows": [
    {
      "GameName": "string",
      "Amount": 0.00,
      "WinAmount": 0.00,
      "CreatedDate": "datetime"
    }
  ]
}
```

---

### 8. Contacts Screen
**File:** `lib/screens/contacts.dart`

#### API: Get Contacts
- **Method:** GET
- **Endpoint:** `/api/MapiContact2/GetContacts`
- **Full URL:** `{domain}/api/MapiContact2/GetContacts`
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Data": [
    {
      "Id": "string",
      "Name": "string",
      "Phone": "string",
      "Status": "string"
    }
  ]
}
```

---

### 9. Contact Requests Screen
**File:** `lib/screens/contactrequests.dart`

#### API: Get Contact Requests
- **Method:** GET
- **Endpoint:** `/api/MapiContact2/GetContactRequests`
- **Full URL:** `{domain}/api/MapiContact2/GetContactRequests`
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Data": [
    {
      "Id": "string",
      "Name": "string",
      "Phone": "string"
    }
  ]
}
```

#### API: Search Contact
- **Method:** GET
- **Endpoint:** `/api/MapiContact2/SearchContact`
- **Full URL:** `{domain}/api/MapiContact2/SearchContact?Text={SearchText}`
- **Parameters:**
  - `Text`: Search text
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Data": [
    {
      "Id": "string",
      "Name": "string",
      "Phone": "string"
    }
  ]
}
```

#### API: Send Contact Request
- **Method:** POST
- **Endpoint:** `/api/MapiContact2/SendContactRequest`
- **Full URL:** `{domain}/api/MapiContact2/SendContactRequest`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "Id": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

#### API: Approve Contact
- **Method:** POST
- **Endpoint:** `/api/MapiContact2/ApproveContact`
- **Full URL:** `{domain}/api/MapiContact2/ApproveContact`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "Id": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

#### API: Cancel Contact
- **Method:** POST
- **Endpoint:** `/api/MapiContact2/CancelContact`
- **Full URL:** `{domain}/api/MapiContact2/CancelContact`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "Id": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

---

### 10. Add Bank Account Screen
**File:** `lib/screens/addbankaccount.dart`

#### API: Get TAC for Add Bank Account
- **Method:** GET
- **Endpoint:** `/api/mapibank/AddBankAccount_GetTac`
- **Full URL:** `{domain}/api/mapibank/AddBankAccount_GetTac`
- **Headers:**
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "ExpiresIn": 300,
  "Message": "TAC sent to your registered phone"
}
```

#### API: Add Bank Account
- **Method:** POST
- **Endpoint:** `/api/mapibank/AddBankAccount`
- **Full URL:** `{domain}/api/mapibank/AddBankAccount`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "BankName": "string",
  "AccountNumber": "string",
  "Tac": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

---

### 11. Change Phone Screen
**File:** `lib/screens/changephone.dart`

#### API: Get TAC for Change Phone
- **Method:** POST
- **Endpoint:** `/api/mapiuser/ChangePhone_GetTac`
- **Full URL:** `{domain}/api/mapiuser/ChangePhone_GetTac`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "Phone": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "ExpiresIn": 300
}
```

#### API: Change Phone
- **Method:** POST
- **Endpoint:** `/api/mapiuser/ChangePhone`
- **Full URL:** `{domain}/api/mapiuser/ChangePhone`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Authorization: bearer {AccessToken}`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "OldPhone": "string",
  "OldTac": "string",
  "NewPhone": "string",
  "NewTac": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

---

### 12. Register Screen
**File:** `lib/screens/register.dart`

#### API: Get Register Send To Options
- **Method:** GET
- **Endpoint:** `/api/mapiuser/Register_GetSendToOptions`
- **Full URL:** `{domain}/api/mapiuser/Register_GetSendToOptions`
- **Headers:**
  - `Lang: {LanguageCode}`
- **Request Body:** None
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "Data": ["email", "phone", "both"]
}
```

#### API: Get Upline
- **Method:** POST
- **Endpoint:** `/api/mapiuser/Register_GetUpline`
- **Full URL:** `{domain}/api/mapiuser/Register_GetUpline`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "Id": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success",
  "ReferralCode": "string"
}
```

#### API: Register User
- **Method:** POST
- **Endpoint:** `/api/mapiuser/Register`
- **Full URL:** `{domain}/api/mapiuser/Register`
- **Headers:**
  - `Content-Type: application/json; charset=UTF-8`
  - `Lang: {LanguageCode}`
- **Request Body:**
```json
{
  "Username": "string",
  "Password": "string",
  "Email": "string",
  "Phone": "string",
  "FullName": "string",
  "Upline": "string"
}
```
- **Response Format:**
```json
{
  "Code": 0,
  "Message": "Success"
}
```

---

### 13. Screens with NO APIs

- **Language Screen** (`language.dart`) - No APIs
- **Edit Alias Screen** (`editalias.dart`) - No APIs
- **Change Avatar Screen** (`changeavatar.dart`) - No APIs
- **Change Name Screen** (`changename.dart`) - No APIs
- **Change Full Name Screen** (`changefullname.dart`) - No APIs
- **Bank Accounts Screen** (`bankaccounts.dart`) - No APIs
- **My Rewards Screen** (`myrewards.dart`) - No APIs
- **My QR Screen** (`myqr.dart`) - No APIs (displays QR code fetched from API)
- **Inbox Screen** (`inbox.dart`) - No APIs
- **Contact Screen** (`contact.dart`) - No APIs
- **Webview Screens** (`webviewforgame.dart`, `webviewformega.dart`, `webviewforpg.dart`, `wv_dailycheckin.dart`) - No direct APIs
- **Checkin Screen** (`checkin.dart`) - No APIs
- **Rebates Screen** (`rebates.dart`) - No APIs
- **Forgot Password Screen** (`forgotpassword.dart`) - No APIs
- **Game Detail Screen** (`gamedetail.dart`) - No APIs
- **Deposit Button Screen** (`deposit_bt.dart`) - No APIs
- **Deposit PG Screen** (`deposit_pg.dart`) - No APIs
- **Login Screen** (`login.dart`) - Uses OAuth/token-based login (handled separately)
- **Promotions Screen** (`promotnc.dart`) - No APIs
- **Tabs Screen** (`tabs.dart`) - API handling via other screens

---

## Common Response Codes

| Code | Meaning |
|------|---------|
| 200 | Request successful |
| 400 | Bad request |
| 401 | Unauthorized (token expired or invalid) |
| 403 | Forbidden |
| 404 | Not found |
| 500 | Internal server error |

---

## Authentication Flow

1. User logs in with credentials
2. Server returns `AccessToken`
3. Store token securely in `FlutterSecureStorage`
4. Include `Authorization: bearer {AccessToken}` in all authenticated requests
5. If token expires (401), clear token and redirect to login

---

## Error Handling

All error responses follow this format:
```json
{
  "Code": 1,
  "Message": "Error description"
}
```

---

**Last Updated:** January 5, 2026
**Version:** 1.0
