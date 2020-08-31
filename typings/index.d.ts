declare module 'danbot-hosting' {
  import { Client, ShardingManager, User } from 'discord.js';

  export class DanBot {
    public constructor(key: string, client: Client);

    private static DJS12: boolean;
    public readonly baseApiUrl: string;
    private _sharding: boolean;
    private key: string;
    public client: Client;
    public activeUsers: User[];
    public commandsRun: number;
    public post(): Promise<boolean | Error>
    public autopost(): Promise<boolean | Error>
    public botInfo(): Promise<Botinfo>

    on(event: string, listener: Function): this;
    on(event: 'autoPost', listener: (time: Date) => void): this;
    on(event: 'post', listener: (time: Date) => void): this;
  }

  export class ShardingClient {
    public constructor(key: string, manager: ShardingManager);

    private static DJS12: boolean;
    public readonly baseApiUrl: string;
    private key: string;
    public manager: ShardingManager;
    public activeUsers: User[];
    public commandsRun: number;
    public post(): Promise<Botinfo>

    on(event: string, listener: Function): this;
    on(event: 'autoPost', listener: (time: Date) => void): this;
    on(event: 'post', listener: (time: Date) => void): this;
  }

  export const Version: string;

  export interface Botinfo {
    
  }
}