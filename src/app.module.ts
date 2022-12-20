import { Module } from "@nestjs/common";
import { MessagingModule } from "@infra/messaging/messaging.module";
import { DatabaseModule } from "@infra/database/database.module";
import { HTTPModule } from "@infra/http/http.module";

@Module({
  imports: [HTTPModule, DatabaseModule, MessagingModule],
})
export class AppModule {}
