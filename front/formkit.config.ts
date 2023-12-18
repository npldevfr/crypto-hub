import { fr } from '@formkit/i18n'
import { defineFormKitConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import formkitTheme from '~/formkit.theme'

export default defineFormKitConfig({
    locales: { fr },
    locale: 'fr',
    config: {
        classes: generateClasses(formkitTheme),
    },
})
