import { ChannelTypeEnum, ICredentials } from '@novu/shared';
import { BaseSmsHandler } from './base.handler';
import { LamSmsProvider } from '@novu/providers';

export class LamSmsHandler extends BaseSmsHandler {
  constructor() {
    super('lam', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    this.provider = new LamSmsProvider({
      accountId: credentials.accountId,
      sender: credentials.sender,
      password: credentials.password,
    });
  }
}
