import {AirbyteConfig} from 'faros-airbyte-cdk';
import {Operation} from 'faros-js-client';
import {Dictionary} from 'ts-essentials';

import {JSONataApplyMode} from '../converters/jsonata';

export enum Edition {
  COMMUNITY = 'community',
  CLOUD = 'cloud',
}

export enum InvalidRecordStrategy {
  FAIL = 'FAIL',
  SKIP = 'SKIP',
}

export interface DestinationConfig extends AirbyteConfig {
  readonly edition_configs: Dictionary<any>;
  readonly dry_run?: boolean;
  readonly invalid_record_strategy?: InvalidRecordStrategy;
  readonly jsonata_destination_models?: ReadonlyArray<string>;
  readonly jsonata_expression?: string;
  readonly jsonata_mode?: JSONataApplyMode;
  readonly origin?: string;
  readonly accept_input_records_origin?: boolean;
  readonly replace_origin_map?: string;
  readonly exclude_fields_map?: string;
  readonly redact_fields_map?: string;
  readonly redact_custom_replace?: string;
  readonly redact_custom_regex?: ReadonlyArray<string>;
  readonly source_specific_configs?: Dictionary<any>;
  readonly keep_alive?: boolean;
  readonly skip_source_success_check?: boolean;
  readonly faros_source_id?: string;
  readonly fail_on_source_error?: boolean;
}

export const FLUSH = {
  model: `__${Operation.FLUSH}`,
  record: {},
};
