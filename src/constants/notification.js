const NOTIFICATION_STATUS = {
  READ: "read",
  UNREAD: "unread"
}

const NOTIFICATION_TYPES = {
  INDIVIDUAL: "individual",
  CUSTOM: "custom",
  GLOBAL: "global"
}

const NOTIFICATION_DESCRIPTION_ARABIC = {

  ORDER_THROUGH_MERCHANT: "شكرا لك على الطلب مع ميثو.",
  MEMBERSHIP_CARD_MINTING_CREATION: (merchantName) =>
    ` تم إنشاء بطاقة عضوية NFT الخاصة بـ ${merchantName}`,
  MEMBERSHIP_CARD_RESHCEDULING: (merchantName, scheduledTime) =>
    ` تمت إعادة جدولة بطاقة عضوية NFT الخاصة بك من ${merchantName} إلى ${scheduledTime}`,
  MEMBERSHIP_CARD_PROGRESS: (merchantName) =>
    ` بطاقة عضويتك الخاصة بـ ${merchantName} قيد التقدم`,
  MEMBERSHIP_CARD_SCHEDULING: (merchantName, scheduledTime) =>
    ` تمت جدولة بطاقة عضوية NFT الخاصة بك من ${merchantName} إلى ${scheduledTime}`,
  PURCHASE_THROUGH_STORE: "شكرا لك على الشراء من المتجر مع ميثو.",
};
const NOTIFICATION_TITLE_ARABIC = {
  MEMBERSHIP_CARD_MINTING: "سك بطاقة العضوية",
  ORDER_THROUGH_MERCHANT: "الشراء من خلال التاجر",
  PURCHASE_THROUGH_STORE: "شكرا لك على الشراء من المتجر مع ميثو.",
};

const NOTIFICATION_DESCRIPTION_ENGLISH = {

  ORDER_THROUGH_MERCHANT: "thank you for ordering with Mithu.",
  PURCHASE_THROUGH_STORE: "thank you for ordering with Mithu.",
};

const NOTIFICATION_TITLE_ENGLISH = {
  MEMBERSHIP_CARD_MINTING: "membership card minting",
  ORDER_THROUGH_MERCHANT: "purchase through merchant",
  PURCHASE_THROUGH_STORE: "purchase through store",
};
module.exports = {
  NOTIFICATION_DESCRIPTION_ARABIC,
  NOTIFICATION_TITLE_ARABIC,
  NOTIFICATION_DESCRIPTION_ENGLISH,
  NOTIFICATION_TITLE_ENGLISH,
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPES,
};