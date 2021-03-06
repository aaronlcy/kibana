/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { IEsSearchResponse } from '../../../../../../../../src/plugins/data/common';
import { CursorType, Inspect, Maybe, PageInfoPaginated, RequestOptionsPaginated } from '../..';

export interface TlsBuckets {
  key: string;
  timestamp?: {
    value: number;
    value_as_string: string;
  };
  subjects: {
    buckets: Readonly<Array<{ key: string; doc_count: number }>>;
  };
  ja3: {
    buckets: Readonly<Array<{ key: string; doc_count: number }>>;
  };
  issuers: {
    buckets: Readonly<Array<{ key: string; doc_count: number }>>;
  };
  not_after: {
    buckets: Readonly<Array<{ key: number; key_as_string: string; doc_count: number }>>;
  };
}

export interface TlsNode {
  _id?: Maybe<string>;
  timestamp?: Maybe<string>;
  notAfter?: Maybe<string[]>;
  subjects?: Maybe<string[]>;
  ja3?: Maybe<string[]>;
  issuers?: Maybe<string[]>;
}

export enum FlowTargetSourceDest {
  destination = 'destination',
  source = 'source',
}

export enum TlsFields {
  _id = '_id',
}

export interface TlsEdges {
  node: TlsNode;
  cursor: CursorType;
}

export interface NetworkTlsRequestOptions extends RequestOptionsPaginated<TlsFields> {
  ip: string;
  flowTarget: FlowTargetSourceDest;
  defaultIndex: string[];
}

export interface NetworkTlsStrategyResponse extends IEsSearchResponse {
  edges: TlsEdges[];
  totalCount: number;
  pageInfo: PageInfoPaginated;
  inspect?: Maybe<Inspect>;
}
