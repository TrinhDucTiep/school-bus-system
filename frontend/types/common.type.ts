interface ICommonResponse<T> {
    code: string;
    message: string;
    result: T;
  }