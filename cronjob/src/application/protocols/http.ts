export type HttpRequest = {
  body?: any;
  params?: any;
  query?: any;
}

export type HttpResponse = {
  statusCode?: number;
  body?: any;
};
