import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Controller('healthcheck')
export class HealthController {
    constructor(
        private healthCheckService: HealthCheckService,
        private http: HttpHealthIndicator,
      ) {}
    
      @Get()
      @HealthCheck()
      checkHealth() {
        return this.healthCheckService.check([
          async () => this.http.pingCheck('google', 'https://www.google.com'),
        ]);
      }
}
