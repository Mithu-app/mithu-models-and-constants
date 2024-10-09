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
  MEMBERSHIP_CARD_MINTING_CREATION: (merchantName) =>
    ` تم إنشاء بطاقة عضوية NFT الخاصة بـ ${merchantName}`,
  MEMBERSHIP_CARD_RESHCEDULING: (merchantName, scheduledTime) =>
    ` تمت إعادة جدولة بطاقة عضوية NFT الخاصة بك من ${merchantName} إلى ${scheduledTime}`,
  MEMBERSHIP_CARD_PROGRESS: (merchantName) =>
    ` بطاقة عضويتك الخاصة بـ ${merchantName} قيد التقدم`,
  MEMBERSHIP_CARD_SCHEDULING: (merchantName, scheduledTime) =>
    ` تمت جدولة بطاقة عضوية NFT الخاصة بك من ${merchantName} إلى ${scheduledTime}`,
};
const NOTIFICATION_TITLE_ARABIC = {
  MEMBERSHIP_CARD_MINTING: "سك بطاقة العضوية",
};

const NOTIFICATION_DESCRIPTION_ENGLISH = {};

const NOTIFICATION_TITLE_ENGLISH = {
  MEMBERSHIP_CARD_MINTING: "membership card minting",
};
module.exports = {
  NOTIFICATION_DESCRIPTION_ARABIC,
  NOTIFICATION_TITLE_ARABIC,
  NOTIFICATION_DESCRIPTION_ENGLISH,
  NOTIFICATION_TITLE_ENGLISH,
  NOTIFICATION_STATUS,
  NOTIFICATION_TYPES,
};