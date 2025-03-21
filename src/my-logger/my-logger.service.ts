import { ConsoleLogger, Injectable } from '@nestjs/common';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    private readonly logDir: string;
    private readonly logFile: string;

    constructor() {
        super();
        const __dirname = path.resolve();
        this.logDir = path.join(__dirname, 'logs');
        this.logFile = path.join(this.logDir, 'myLogFile.log');
        
    
        this.ensureLogDirectory().catch(err => {
            console.error('Failed to create log directory:', err);
        });
    }

    private async ensureLogDirectory() {
        try {
            // Check if directory exists
            const exists = await fsPromises.access(this.logDir)
                .then(() => true)
                .catch(() => false);
                
            if (!exists) {
                console.log(`Creating log directory at: ${this.logDir}`);
                await fsPromises.mkdir(this.logDir, { recursive: true });
            }
        } catch (err) {
            console.error('Error creating log directory:', err);
            throw err;
        }
    }

    async logToFile(entry: string) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Chicago',
        }).format(new Date())}\t${entry}\n`;
    
        try {
         
            await this.ensureLogDirectory();
            
            console.debug(`Writing to log file: ${this.logFile}`);
            
        
            await fsPromises.appendFile(this.logFile, formattedEntry);
        } catch (err) {
            console.error('Failed to write to log file:', err);
        }
    }
    
    log(message: any, context?: string) {
        const entry = `${context || ''}\t${message}`;
    
        void this.logToFile(entry);
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext || ''}\t${message}`;

        void this.logToFile(entry);
        super.error(message, stackOrContext);
    }
}
