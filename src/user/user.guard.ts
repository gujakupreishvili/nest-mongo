import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request | any = context.switchToHttp().getRequest()

    const userId = request.headers['user-id'] as string
    request.userId=userId
    
    return  true
  }
}