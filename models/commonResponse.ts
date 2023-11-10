export class CommonResponse {
  code: boolean;
  message: string;
  data: any;
  constructor(code: boolean, message: string, data?: any) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
