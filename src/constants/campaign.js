const CAMPAIGN_TYPE = {
  SEASONAL: "seasonal",      //  Eid, Ramadan, Independence Day
  REFERRAL: "referral",      //  earn
  EVENT: "event",            //  launches or promotions
};

const CAMPAIGN_STATUS = {
  ACTIVE: "active",           
  INACTIVE: "active",           
  EXPIRED: "expired",         
};

const TASK_TYPE = {
  UPLOAD_IMAGE: "upload_image",  //  picture (like Bakra Eid goat)
  QUIZ: "quiz",                  //  for rewards
  POLL: "poll",                  //  poll
  CHECK_IN: "check_in",          //  during a time period
};

const REWARD_TYPE = {
  FIXED: "fixed",            //  same points (e.g. 100 points) 
  RANDOM: "random",          //  min-max (e.g. 50-200 points)
};


module.exports = {
  CAMPAIGN_TYPE,
  CAMPAIGN_STATUS,
  TASK_TYPE,
  REWARD_TYPE,
};
