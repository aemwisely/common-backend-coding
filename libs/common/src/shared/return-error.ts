import { I18nService } from 'nestjs-i18n';

export class I18nServiceHelper {
  private static i18nService: I18nService;

  static setI18nService(service: I18nService): void {
    I18nServiceHelper.i18nService = service;
  }

  static t(key: string): string {
    if (!I18nServiceHelper.i18nService) {
      throw new Error('I18nService has not been initialized.');
    }
    return I18nServiceHelper.i18nService.t(key);
  }
}

export const ReturningTranslator = (key: string): string => {
  return I18nServiceHelper.t(key);
};
