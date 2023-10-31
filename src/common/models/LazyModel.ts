export interface LazyModel<T> {
  data: T | null;
  error: any | null;
  loading: boolean;
}
