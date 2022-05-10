import { HttpResponse, HttpRequest } from "@/application/protocols";

export interface IController {
  handle: (request: HttpRequest) => Promise<HttpResponse>;
}
