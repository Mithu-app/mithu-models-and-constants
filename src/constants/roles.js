
const PERSMISSIONS_TYPES = {
  CUSTOMER_MANAGEMENT: "Customer-Management",
  MERCHANT_MANAGEMENT: "Merchant-Management",
  STORE_LOYALTY_MANAGEMENT: "Store-Loyalty-Management",
  LANGUAGE_MANAGEMENT: "Language-Management",
  SLIDER_MANAGEMENT: "Slider-Management",
  CATEGORY_MANAGEMENT: "Category-Management",
  REGION_MANAGEMENT: "Region-Management",
  CLASSIFICATION_MANAGEMENT: "Classification-Management",
  CURRENCY_MANAGEMENT: "Currency-Management",
  TRANSACTION_MANAGEMENT: "Transaction-Management",
  USER_MANAGEMENT: "User-Management",
  CUSTOMER_SUPPORT: "Customer-Support",
  REPORTING_AND_ANALYTICS: "Reporting-And-Analytics",
  FAQS: "Faqs",
  AFFILIATE_MARKETING: "Affiliate-Marketing",
  DEVICE_MANAGEMENT: "Device-Management",
  PUSH_NOTIFICATION: "Push-Notification",
  SETTINGS_MANAGEMENT: "Settings-Management",
  CART_RULES_MANAGEMENT: "Cart-Rules-Management",
};

const PERMISSION_ACTION_TYPES = {
    FULL_ACCESS: 'Full-Access',
    NO_ACCESS: 'No-Access',
    EDITOR_ACCESS: 'Editor-Access',
    READ_ONLY_ACCESS: 'Read-Only-Access',
}

const PERMISSION_PRIORITY = {
    [PERMISSION_ACTION_TYPES.FULL_ACCESS]: 3,
    [PERMISSION_ACTION_TYPES.EDITOR_ACCESS]: 2,
    [PERMISSION_ACTION_TYPES.READ_ONLY_ACCESS]: 1,
    [PERMISSION_ACTION_TYPES.NO_ACCESS]: 0,
};

const ROLE_NAMES = {
    SUPER_ADMIN: 'Super-Admin',
    ADMIN: 'Admin',
    CUSTOMER_MANAGER: 'Customer-Manager',
    USER_MANAGER: 'User-Manager',
    MERCHANT_MANAGER: 'Merchant-Manager',
    CONTENT_MANAGER: 'Content-Manager',
    CUSTOMER_SUPPORT: 'Customer-Support',
}

module.exports = {
    ROLE_NAMES,
    PERMISSION_ACTION_TYPES,
    PERMISSION_PRIORITY,
    PERSMISSIONS_TYPES
}