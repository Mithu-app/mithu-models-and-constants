// Define constants for OTP purposes
const OTP_PURPOSES = {
    LOGIN: "login",
    EMAIL_VERIFICATION: "email_verification",
    RESET_PASSWORD: "reset_password",
    REDEMPTION_CODE: "redemption_code",
    FORGOT_PASSWORD : "forgot-password"
};

const OTP_SENDER_PLATFORM = {
    WHATSAPP : 'whatsapp',
    TAQNYAT : 'taqnyat'

}

module.exports = {
    OTP_PURPOSES,
    OTP_SENDER_PLATFORM
}