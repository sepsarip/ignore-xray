export type Dialect = 'git' | 'docker';

export interface FileEntry {
  relPath: string;
  isDir: boolean;
  size: number;
}

export type LineStatus =
  | 'MATCHED'
  | 'DEAD_RULE'
  | 'REDUNDANT'
  | 'RESCUED'
  | 'INEFFECTIVE_NEGATION';

export interface LineMetric {
  /** 1-based line number in the ignore file */
  lineNumber: number;
  pattern: string;
  isNegation: boolean;
  status: LineStatus;
  matchedFiles: number;
  matchedDirs: number;
  bytes: number;
  redundantCount: number;
  /** 1-based line number of the earlier rule that already ignored these entries */
  redundantLine?: number;
  /** 1-based line number of the parent directory rule blocking a Git negation */
  blockedByLine?: number;
  /** Blocking parent directory pattern/path for diagnostic display */
  blockedByPattern?: string;
  /** Top 5 largest entries directly affected by this line */
  topEntries: FileEntry[];
}

export interface EvaluateRequest {
  type: 'EVALUATE_DOC';
  requestId: number;
  docUri: string;
  basePath: string;
  dialect: Dialect;
  content: string;
  forceRescan: boolean;
  maxFiles: number;
}

export interface EvaluationResult {
  type: 'EVALUATION_RESULT';
  requestId: number;
  docUri: string;
  isPartial: boolean;
  isLineTruncated: boolean;
  totalIgnoredBytes: number;
  contextLeftBytes: number;
  gitExposedBytes: number;
  lineMetrics: LineMetric[];
  topUnignored: FileEntry[];
}
