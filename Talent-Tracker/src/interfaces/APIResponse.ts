export interface APIResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  // Omit if you don't handle these with fetch
  // config?: Record<string, any>;
  // request?: Request;
}
