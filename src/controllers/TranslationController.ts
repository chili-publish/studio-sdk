import translationData from '../constants/translations';

/**
 * The TranslationController is responsible for all communication regarding Translations.
 * Methods inside this controller can be called by `window.SDK.translation.{method-name}`
 */
export class TranslationController {
    /**
     * @ignore
     */

    /**
     * This method returns the list of translations
     * @returns
     */
    getTranslations = async () => {
        return translationData;
    };
}
