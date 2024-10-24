const TRANSACTION_SOURCE_NAME = {
  MEMBERSHIP_CLAIM: "membership claim",
  REDEEM_POINTS: "redeem points",
  PURCHASE: "purchase",
  REVIEW: "review",
  SOCIAL_SHARING: "social sharing",
  GAMIFICATION_BASED: "gamification based",
  SIGN_UP_AND_GET_100_POINTS: "sign up and get 100 points",
  POINTS_THROUGH_PURCHASE: "points through purchase",
  CONVERSION_THROUGH_THIRD_PARTY: "conversion through third party",
  EVENT_BASED_POINTS: "event based points",
  POINTS_BY_SHARING: "points by sharing",
  PURCHASE_POINTS_DIRECTLY_ON_MITHU: "purchase points directly on mithu",
  REVIEW_EXTERNALLY_OR_INTERNALLY: "review externally or internally",
  REFERRAL_BASED_POINTS: "referral based points",
  PURCHASE_ONLINE: "purchase-online",
};
const TRANSACTION_TYPE = {
    NETWORK: "network",
    MERCHANT: "merchant"
}
const TRANSACTION_SOURCE_TYPE = {
    EARNING: "earning",
    REDEMPTION: "redemption"
}
const TRANSACTION_STATUS = {
  ENABLED: "enabled",
  DISABLED: "disabled",
};

module.exports = {
  TRANSACTION_SOURCE_NAME,
  TRANSACTION_SOURCE_TYPE,
  TRANSACTION_TYPE,
  TRANSACTION_STATUS,
};