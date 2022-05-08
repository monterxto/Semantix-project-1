import { HttpResponse, HttpRequest } from "@/application/protocols";

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>;
}
