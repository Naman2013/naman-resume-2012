export const CLOSE_ALL_GLOBAL_NAV_MENUS = 'CLOSE_ALL_GLOBAL_NAV_MENUS';
export const TOGGLE_GLOBAL_NAV_MENU = 'TOGGLE_GLOBAL_NAV_MENU';
export const TOGGLE_GLOBAL_NAV_NOTIFICATION_MENU = 'TOGGLE_GLOBAL_NAV_NOTIFICATION_MENU';
export const CLOSE_UPSELL_MODAL = 'CLOSE_UPSELL_MODAL';
export const OPEN_UPSELL_MODAL = 'OPEN_UPSELL_MODAL';


export const closeAllMenus = () => ({
  type: CLOSE_ALL_GLOBAL_NAV_MENUS,
});

export const toggleGlobalNavMenu = payload => ({
  type: TOGGLE_GLOBAL_NAV_MENU,
  payload,
});

export const toggleGlobalNavNotificationMenu = payload => ({
  type: TOGGLE_GLOBAL_NAV_NOTIFICATION_MENU,
  payload,
});

export const closeUpsellModal = () => ({
  type: CLOSE_UPSELL_MODAL,
});

export const openUpsellModal = () => ({
  type: OPEN_UPSELL_MODAL,
});
