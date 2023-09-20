import { Controller, Get, Query } from '@nestjs/common';
import { Repository } from './repository';

/**
 *
 */
@Controller()
export class AppController {
  /**
   *
   * @param repository
   */
  constructor(private repository: Repository) {}

  /**
   *
   * @param query
   * @returns
   */
  @Get('search')
  async searchMessages(@Query('query') query: string) {
    return await this.repository.searchWithText(query);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Get('find-previous')
  async findAllMessagesTo(@Query('id') id: string) {
    return await this.repository.findAllPreviousMessages(id);
  }
}
