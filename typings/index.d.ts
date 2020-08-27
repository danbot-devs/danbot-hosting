declare module 'danbot-hosting' {
  import { Client, ShardingManager, User } from 'discord.js';

  export class DanBot {
    public constructor(key: String, client: Client);

    private static DJS12: Boolean;
    private _sharding: Boolean;
    public key: String;
    public readonly baseApiUrl: String;
    public client: Client;
    public activeUsers: User[];
    public commandsRun: Number;
    public post(): Promise<boolean | Error>
    public autopost(): Promise<boolean | Error>
    public botInfo(): Promise<any | Error>
  }

  export class ShardingClient {
    public constructor(key: String, manager: ShardingManager);

    public key: String;
    public readonly baseApiUrl: String;
    public manager: ShardingManager;
    public activeUsers: User[];
    public commandsRun: Number;
    public post(): Promise<boolean | Error>
  }

  export const Version: string;
}