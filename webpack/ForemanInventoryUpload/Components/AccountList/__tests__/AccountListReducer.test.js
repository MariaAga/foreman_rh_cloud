import { testReducerSnapshotWithFixtures } from '@theforeman/test';

import {
  INVENTORY_ACCOUNT_STATUS_POLLING,
  INVENTORY_ACCOUNT_STATUS_POLLING_START,
  INVENTORY_ACCOUNT_STATUS_POLLING_STOP,
  INVENTORY_ACCOUNT_STATUS_POLLING_ERROR,
  INVENTORY_PROCESS_RESTART,
} from '../AccountListConstants';
import reducer from '../AccountListReducer';
import {
  error,
  pollingProcessID,
  accountID,
  processStatusName,
  autoUploadEnabled,
  hostObfuscationEnabled,
  ipsObfuscationEnabled,
  pollingResponse,
} from '../AccountList.fixtures';
import { AUTO_UPLOAD_TOGGLE } from '../../AutoUploadSwitcher/AutoUploadSwitcherConstants';
import { HOST_OBFUSCATION_TOGGLE } from '../../HostObfuscationSwitcher/HostObfuscationSwitcherConstants';
import { IPS_OBFUSCATION_TOGGLE } from '../../IpsObfuscationSwitcher/IpsObfuscationSwitcherConstants';

const fixtures = {
  'should return the initial state': {},
  'should handle INVENTORY_ACCOUNT_STATUS_POLLING': {
    action: {
      type: INVENTORY_ACCOUNT_STATUS_POLLING,
      payload: pollingResponse,
    },
  },
  'should handle INVENTORY_ACCOUNT_STATUS_POLLING_ERROR': {
    action: {
      type: INVENTORY_ACCOUNT_STATUS_POLLING_ERROR,
      payload: { error },
    },
  },
  'should handle INVENTORY_ACCOUNT_STATUS_POLLING_START': {
    action: {
      type: INVENTORY_ACCOUNT_STATUS_POLLING_START,
      payload: {
        pollingProcessID,
      },
    },
  },
  'should handle INVENTORY_ACCOUNT_STATUS_POLLING_STOP': {
    action: {
      type: INVENTORY_ACCOUNT_STATUS_POLLING_STOP,
    },
  },
  'should handle INVENTORY_PROCESS_RESTART': {
    action: {
      type: INVENTORY_PROCESS_RESTART,
      payload: {
        accountID,
        processStatusName,
      },
    },
  },
  'should handle AUTO_UPLOAD_TOGGLE': {
    action: {
      type: AUTO_UPLOAD_TOGGLE,
      payload: {
        autoUploadEnabled,
      },
    },
  },
  'should handle HOST_OBFUSCATION_TOGGLE': {
    action: {
      type: HOST_OBFUSCATION_TOGGLE,
      payload: {
        hostObfuscationEnabled,
      },
    },
  },
  'should handle IPS_OBFUSCATION_TOGGLE': {
    action: {
      type: IPS_OBFUSCATION_TOGGLE,
      payload: {
        ipsObfuscationEnabled,
      },
    },
  },
};

describe('AccountList reducer', () =>
  testReducerSnapshotWithFixtures(reducer, fixtures));
