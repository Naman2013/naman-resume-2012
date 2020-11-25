/* Centralized repository of join flow API endpoints */
export const JOIN_PAGE_ENDPOINT_URL = '/api/page/join';
export const SUBSCRIPTION_PLANS_ENDPOINT_URL = '/api/registration/getSubscriptionPlans';
export const GOOGLE_CLIENT_ID_ENDPOINT_URL = '/api/registration/getGoogleClientID';
export const GOOGLE_SSO_SIGNIN_ENDPOINT_URL = '/api/registration/processGoogleSSOSignin';
export const GOOGLE_SSO_LINKACCT_ENDPOINT_URL = '/api/registration/linkGoogleAcctToCustomer';

export const VALIDATE_NEW_PENDING_CUSTOMER_DETAILS_ENDPOINT_URL = '/api/registration/validateNewPendingCustomerDetails';

export const CHECK_ACTIVE_GIFT_CARD_SUBSCRIPTION = '/api/registration/activateGiftCardSubscription';


export const JOIN_CREATE_PENDING_CUSTOMER_ENDPOINT_URL = '/api/registration/createPendingCustomer';
export const JOIN_ACTIVATE_PENDING_CUSTOMER_ENDPOINT_URL = '/api/registration/activatePendingCustomer';

export const UPGRADE_CUSTOMER_ENDPOINT_URL = '/api/registration/upgradeCustomer';
export const CANCEL_CUSTOMER_ENDPOINT_URL = '/api/registration/cancelCustomer';

export const JOIN_VALIDATE_INVITATIONCODE_ENDPOINT_URL = '/api/registration/validateCustomerLinkInvitationAlt';
export const JOIN_CREATE_INVITED_CUSTOMER_ENDPOINT_URL = '/api/registration/activateInvitedCustomer';
export const JOIN_VALIDATE_INVITATION_GIFT_CARD_ENDPOINT_URL = '/api/registration/verifyGiftCardSignupDetails';
export const JOIN_VALIDATE_INVITATION_CODE_DETAILS_URL = '/api/registration/invitationCodeDetails';


export const CREATE_CUSTOMER_LINK_INVITATION_ENDPOINT_URL = '/api/registration/createCustomerLinkInvitation';

export const FORGOT_PASSWORD_REQUEST_ENDPOINT_URL = '/api/registration/forgotPasswordRequest';
export const FORGOT_PASSWORD_CONFIRMRESETTOKEN_ENDPOINT_URL = '/api/registration/forgotPasswordConfirmResetToken';
export const FORGOT_PASSWORD_CHANGEPASSWORD_ENDPOINT_URL = '/api/registration/forgotPasswordChangePassword';

export const EDIT_PAYMENT_ENDPOINT_URL = '/api/registration/editPayment';

export const VERIFY_CLUB_CODE_ENDPOINT_URL = '/api/registration/verifyClubCode';

export const UPDATE_ACCOUNT_DETAILS_ENDPOINT_URL = '/api/registration/updateAccountDetails';

export const VERIFY_CAPTCHA_CODE_URL = '/api/registration/verifyCaptcha';