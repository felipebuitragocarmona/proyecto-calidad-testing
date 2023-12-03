import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (
      (!Seeder.default.environment.includes('development') && Application.inDev)
      || (!Seeder.default.environment.includes('test') && Application.inTest)
      || (!Seeder.default.environment.includes('production') && Application.inProduction)
    ) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../0-Permission'))
    await this.runSeeder(await import('../1-Role'))
    await this.runSeeder(await import('../2-User'))
    await this.runSeeder(await import('../3-Process'))
    await this.runSeeder(await import('../4-Task'))
    await this.runSeeder(await import('../5-SubTask'))
    await this.runSeeder(await import('../6-Param'))
    await this.runSeeder(await import('../7-Patient'))
    await this.runSeeder(await import('../8-Exam'))
    await this.runSeeder(await import('../100-RolePermission'))
    await this.runSeeder(await import('../101-SubTaskParam'))

  }
}
