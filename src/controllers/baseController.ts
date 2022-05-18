import {
    Controller,
    Get,
    Body,
    Request,
    Route,
    Post,
    Path,
    Response,
    SuccessResponse,
  } from "tsoa";

  export type Params = Pick<TypeError, "field">
  
  interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("xxxx")
export class BaseController extends Controller {
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Post()
    public async doPost(@Body() params: Params): Promise<void> {

    }

    private async makePost(url: string, data: string): Promise<string> {
        var response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
          });
        return JSON.stringify(await response.json());
    }
}
