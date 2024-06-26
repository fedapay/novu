import {
  ChannelTypeEnum,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
} from '@novu/stateless';
import axios from 'axios';

export class LamSmsProvider implements ISmsProvider {
  id = 'lam';
  channelType = ChannelTypeEnum.SMS as ChannelTypeEnum.SMS;
  public readonly DEFAULT_BASE_URL = 'https://lamsms.lafricamobile.com/api';

  constructor(
    private config: {
      accountId?: string;
      sender?: string;
      password?: string;
    }
  ) {}

  async sendMessage(
    options: ISmsOptions
  ): Promise<ISendMessageSuccessResponse> {
    const payload = {
      accountid: this.config.accountId,
      sender: this.config.sender,
      password: this.config.password,
      to: options.to,
      text: options.content,
    };
    const url = this.DEFAULT_BASE_URL;
    const response = await axios.post(url, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      id: response.data[0].id,
      date: new Date().toISOString(),
    };
  }
}
