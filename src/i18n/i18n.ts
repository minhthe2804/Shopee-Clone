import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from '~/locales/en/home.json'
import HOME_VI from '~/locales/vi/home.json'
import PRODUCTDETAIL_EN from '~/locales/en/product.json'
import PRODUCTDETAIL_VI from '~/locales/vi/product.json'
import NAVHEADER_EN from '~/locales/en/navheader.json'
import NAVHEADER_VI from '~/locales/vi/navheader.json'
import SORTPRODUCTLIST_EN from '~/locales/en/sortProductList.json'
import SORTPRODUCTLIST_VI from '~/locales/vi/sortProductList.json'

export const locales = {
    en: 'English',
    vi: 'Tiếng Việt'
} as const

export const resources = {
    en: {
        home: HOME_EN,
        productDetail: PRODUCTDETAIL_EN,
        navHeader: NAVHEADER_EN,
        sortProductList: SORTPRODUCTLIST_EN
    },
    vi: {
        home: HOME_VI,
        productDetail: PRODUCTDETAIL_VI,
        navHeader: NAVHEADER_VI,
        sortProductList: SORTPRODUCTLIST_VI
    }
} as const

export const defaultNS = 'home'

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    ns: ['home', 'productDetail', 'navHeader', 'sortProductList'],
    fallbackLng: 'vi',
    defaultNS,
    interpolation: {
        escapeValue: false // react already safes from xss
    }
})
