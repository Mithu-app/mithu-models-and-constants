"use strict";

const { AFFILIATE_ORDER_PLATFORM_TYPE } = require("./order");

const MODEL = {
  MITHU: "Mithu",
  TOKEN: "Token",
  CUSTOMER: "Customer",
  VERIFICATION: "Verification",
  RESET_PASSWORD: "ResetPassword",
  PASSWORD: "Password",
  COUNTRY: "Country",
  OTP: "Otp",
  CURRENCY: "Currency",
  CRYPTO_CURRENCY: "CryptoCurrency",
  TRANSACTION_SOURCES: "TransactionSource",
  CUSTOMER_TYPES: "CustomerType",
  CUSTOMER_BALANCES: "CustomerBalance",
  MERCHANT: "Merchant",
  BRAND: "Brand",
  MERCHANT_TYPE: "MerchantType",
  MERCHANT_TAG: "MerchantTags",
  REFERRAL_CODE: "ReferralCode",
  FAQ: "FAQ",
  TICKET: "Ticket",
  CATEGORY: "Category",
  CUSTOMER_TRANSACTION: "CustomerTransaction",
  NOTIFICATION: "Notification",
  RATING: "Rating",
  SLIDER: "Slider",
  ORDER: "Order",
  MERCHANT_CATEGORY: "MerchantCategory",
  MERCHANT_PRODUCT: "MerchantProduct",
  USER: "User",
  CITY: "City",
  STATE: "State",
  LANGUAGE: "Language",
  LOCALIZATION: "Localization",
  SYSTEM_LOCALIZATION: "SystemLocalization",
  CUISINE_TYPE: "CuisineType",
  AREA: "Area",
  CUSTOMER_CLASSIFICATION: "CustomerClassification",
  ROLE: "Role",
  STORE_LOYALTY: "StoreLoyalty",
  MEMBERSHIP_CLAIM: "MembershipClaim",
  MERCHANT_PROMOTION_TAG: "MerchantPromotionTag",
  FOODICS_REWARD: "FoodicsReward",
  THIRD_PARTY_INTEGRATION: "ThirdPartyIntegration",
  MERCHANT_VIBE: "MerchantVibe",
  MERCHANT_FACILITY: "MerchantFacility",
  CART_RULE: "CartRule",
  VIBE_CATEGORY: "VibeCategory",
  PUSH_NOTIFICATION: "PushNotification",
  HOLDING_SCHEMA: "HoldingSchema",
  SETTINGS: "Settings",
  ACTIVITY_LOG: "ActivityLog",
  MESSAGE_LOG: "MessageLog",
  USER_SESSION: "UserSession",
  DEVICE: "Device",
  VENDOR_CUSTOMER_SESSION: "VendorCustomerSession",
  STORE_CATEGORY: "StoreCategory",
  STORE: "Store",
  STORE_TAG: "StoreTag",
  SAVED_STORE: "SavedStore",
  AFFILIATE_MARKETING_ORDER: "AffiliateMarketingOrder",
  TOPUP: "Topup",
  SMS_LOG: "SmsLOG",
  VENDOR_DEVICE_SESSION: "VendorDeviceSession",
  SPIN_MACHINE_GAME: "SpinMachineGame",
  SLOT_MACHINE_GAME: "SlotMachineGame",
  MESSAGE_QUEUE: "MessageQueue",
  MESSAGE_QUEUE_RECORD: "MessageQueueRecord",
  GAMIFICATION: "Gamification",
};

const COLLECTION = {
  MITHU: "mithu",
  TOKEN: "tokens",
  CUSTOMER: "customers",
  RESET_PASSWORD: "reset_password",
  PASSWORD: "passwords",
  COUNTRY: "country",
  OTP: "otp",
  CURRENCY: "currency",
  CRYPTO_CURRENCY: "crypto_currency",
  TRANSACTION_SOURCES: "transaction_sources",
  CUSTOMER_TYPES: "customer_types",
  CUSTOMER_BALANCES: "customer_balances",
  MERCHANT: "merchant",
  MERCHANT_TYPE: "merchant_type",
  MERCHANT_TAGS: "merchant_tags",
  BRAND: "brand",
  REFERRAL_CODE: "referral_code",
  FAQ: "faq",
  TICKET: "ticket",
  CATEGORY: "category",
  CUSTOMER_TRANSACTION: "customer_transaction",
  NOTIFICATION: "notification",
  RATING: "rating",
  SLIDER: "slider",
  ORDER: "order",
  MERCHANT_CATEGORY: "merchant_category",
  MERCHANT_PRODUCT: "merchant_product",
  USER: "users",
  CITY: "city",
  STATE: "state",
  LANGUAGE: "language",
  LOCALIZATION: "localization",
  SYSTEM_LOCALIZATION: "system_localization",
  CUISINE_TYPE: "cuisine_type",
  AREA: "area",
  CUSTOMER_CLASSIFICATION: "customer_classification",
  ROLE: "role",
  STORE_LOYALTY: "store_loyalty",
  MEMBERSHIP_CLAIM: "membership_claim",
  MERCHANT_PROMOTION_TAG: "merchant_promotion_tag",
  THIRD_PARTY_INTEGRATION: "third_party_integration",
  FOODICS_REWARD: "foodics_reward",
  MERCHANT_VIBE: "merchant_vibe",
  MERCHANT_FACILITY: "merchant_facility",
  CART_RULE: "cart_rule",
  VIBE_CATEGORY: "vibe_category",
  PUSH_NOTIFICATION: "push_notification",
  HOLDING_SCHEMA: "HoldingSchema",
  SETTINGS: "settings",
  ACTIVITY_LOG: "activity_log",
  MESSAGE_LOG: "message_log",
  USER_SESSION: "user_session",
  DEVICE: "device",
  VENDOR_CUSTOMER_SESSION: "vendor_customer_session",
  STORE_CATEGORY: "store_category",
  STORE: "store",
  STORE_TAG: "store_tag",
  SAVED_STORE: "saved_store",
  AFFILIATE_MARKETING_ORDER: "affiliate_marketing_order",
  TOPUP: "topup",
  SMS_LOG: "smsLog",
  VENDOR_DEVICE_SESSION: "vendor_device_session",
  SPIN_MACHINE_GAME: "spin_machine_game",
  SLOT_MACHINE_GAME: "slot_machine_game",
  MESSAGE_QUEUE: "message_queue",
  MESSAGE_QUEUE_RECORD: "message_queue_record",
  GAMIFICATION: "gamification",
};

const TIMESTAMPS = {
  createdAt: "created_at",
  updatedAt: "updated_at",
};

const OWNER = {
  USER: "USER",
  CLIENT: "CLIENT",
};

module.exports = {
  MODEL,
  COLLECTION,
  TIMESTAMPS,
  OWNER,
};
