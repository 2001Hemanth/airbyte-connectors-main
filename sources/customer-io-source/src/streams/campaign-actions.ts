import {AxiosInstance} from 'axios';
import {AirbyteLogger, AirbyteStreamBase, SyncMode} from 'faros-airbyte-cdk';
import {Dictionary} from 'ts-essentials';

import {CustomerIO, CustomerIOConfig} from '../customer-io/customer-io';
import {CustomerIOCampaignAction} from '../customer-io/typings';

export class CampaignActions extends AirbyteStreamBase {
  constructor(
    logger: AirbyteLogger,
    private readonly config: CustomerIOConfig,
    private readonly axios?: AxiosInstance
  ) {
    super(logger);
  }

  getJsonSchema(): Dictionary<any, string> {
    return require('../../resources/schemas/campaign-actions.json');
  }

  get primaryKey(): string {
    return 'id';
  }

  get cursorField(): string {
    return 'updated';
  }

  getUpdatedState(
    currentStreamState: Dictionary<any>,
    latestRecord: Dictionary<any>
  ): Dictionary<any> {
    return {
      cutoff: Math.max(
        currentStreamState.cutoff ?? 0,
        latestRecord.updated ?? 0
      ),
    };
  }

  async *readRecords(
    syncMode: SyncMode,
    cursorField?: string[],
    streamSlice?: Dictionary<any, string>,
    streamState?: Dictionary<any, string>
  ): AsyncGenerator<CustomerIOCampaignAction, any, unknown> {
    const lastCutoff: number = streamState?.cutoff ?? 0;

    const customerIO = CustomerIO.instance(this.config, this.axios);

    yield* customerIO.getCampaignActions(lastCutoff);
  }
}
