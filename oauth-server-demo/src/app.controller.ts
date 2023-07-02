import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('oauth')
  async redirect(@Query('code') code: string, @Res() res: Response) {
    //在应用内直接跳转会表现不正常，但是在oauth2.0的流程中会表现正常。
    if (code) {
      //获取权限
      const clientId = '8acc5d74b8c8553b867b';
      const clientSecret = '6990e94ce51631ba947f4e05af812ddf286492b5';
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token?' +
          `client_id=${clientId}&` +
          `client_secret=${clientSecret}&` +
          `code=${code}`,
        {},
        {
          headers: {
            accept: 'application/json',
          },
        },
      );
      const accessToken = tokenResponse.data.access_token;
      console.log(`access token: ${accessToken}`);
      //获取信息
      const result = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      });
      const { id } = result.data;
      const privateKey = 'fzhanghwps';
      const token = jwt.sign({ id }, privateKey, {
        algorithm: 'HS256',
        expiresIn: 8 * 24 * 60 * 60,
      });
      //cookie会被存到目的域处
      res.cookie('oauth-token', token);
      //页面重定向
      res.redirect('http://localhost:3000/#/test');
    } else {
      res.redirect('http://localhost:3000/');
    }
  }

  @Get('testToken')
  testToken(@Req() req: Request) {
    const authToken = req.cookies['oauth-token'];
    const privateKey = 'fzhanghwps';
    if (authToken) {
      try {
        const res = jwt.verify(authToken, privateKey);
        if (typeof res === 'string' || !res) {
          return {
            code: 0,
            id: -1,
            msg: '鉴权失败',
          };
        } else {
          return {
            code: 1,
            id: res.id,
            msg: '校验成功',
          };
        }
      } catch (e) {
        return {
          code: 0,
          id: -1,
          msg: '鉴权失败',
        };
      }
    } else {
      return {
        code: 0,
        id: -1,
        msg: '鉴权失败',
      };
    }
  }
}
