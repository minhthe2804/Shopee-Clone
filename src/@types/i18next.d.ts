import 'i18next'
import { defaultNS } from '~/i18n/i18n'

declare module 'i18next' {
    // Kế thừa (thêm vào type)
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS
    }
}
