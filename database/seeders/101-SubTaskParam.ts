import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SubtaskParam from 'App/Models/SubtaskParam'

export default class extends BaseSeeder {
  public static environment = ['development', 'test']
  public async run () {
    await SubtaskParam.createMany([
      //t1 s1
      {"type":"input","subtask_id":1,"param_id":1,"default_value":"22"},
      {"type":"input","subtask_id":1,"param_id":2,"default_value":"50"},
      {"type":"input","subtask_id":1,"param_id":3,"default_value":"base_calling"},
      {"type":"input","subtask_id":1,"param_id":5,"default_value":"4"},
      {"type":"input","subtask_id":1,"param_id":6,"default_value":"FLO-PRO002"},
      {"type":"input","subtask_id":1,"param_id":7,"default_value":"SQK-LSK109"},
      {"type":"input","subtask_id":1,"param_id":8,"default_value":"5"},
      {"type":"input","subtask_id":1,"param_id":9,"default_value":"1"},
      {"type":"input","subtask_id":1,"param_id":13},
      {"type":"output","subtask_id":1,"param_id":14},
      

      //t2 s1
      {"type":"input","subtask_id":2,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":2,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":2,"param_id":3,"default_value":"task2_subtask1"},
      {"type":"input","subtask_id":2,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":2,"param_id":10,"default_value":"GRCh38"},
      {"type":"input","subtask_id":2,"param_id":11,"default_value":"minimap2"},
      {"type":"input","subtask_id":2,"param_id":14},
      {"type":"output","subtask_id":2,"param_id":15},
      
      //t2 s2
      {"type":"input","subtask_id":3,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":3,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":3,"param_id":3,"default_value":"task2_subtask2"},
      {"type":"input","subtask_id":3,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":3,"param_id":11,"default_value":"minimap2"},
      {"type":"input","subtask_id":3,"param_id":15},
      {"type":"output","subtask_id":3,"param_id":16},
      //t3 s3
      {"type":"input","subtask_id":4,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":4,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":4,"param_id":3,"default_value":"task2_subtask3"},
      {"type":"input","subtask_id":4,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":4,"param_id":11,"default_value":"minimap2"},
      {"type":"input","subtask_id":4,"param_id":16},
      {"type":"output","subtask_id":4,"param_id":17},
      //t3 s1
      {"type":"input","subtask_id":5,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":5,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":5,"param_id":3,"default_value":"smc_pmd"},
      {"type":"input","subtask_id":5,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":5,"param_id":17},
      {"type":"output","subtask_id":5,"param_id":18},
      //t3 s2
      {"type":"input","subtask_id":6,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":6,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":6,"param_id":3,"default_value":"smc_nac"},
      {"type":"input","subtask_id":6,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":6,"param_id":17},
      {"type":"output","subtask_id":5,"param_id":18},
      //t3 s3
      {"type":"input","subtask_id":7,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":7,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":7,"param_id":3,"default_value":"smc_nac"},
      {"type":"input","subtask_id":7,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":7,"param_id":17},
      {"type":"output","subtask_id":5,"param_id":18},
      //t3 s4
      {"type":"input","subtask_id":8,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":8,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":8,"param_id":3,"default_value":"smc_los"},
      {"type":"input","subtask_id":8,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":8,"param_id":17},
      {"type":"output","subtask_id":5,"param_id":18},
      //t3 s5
      {"type":"input","subtask_id":9,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":9,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":9,"param_id":3,"default_value":"smc_cl3"},
      {"type":"input","subtask_id":9,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":9,"param_id":17},
      {"type":"output","subtask_id":5,"param_id":18},
      //t4 s1
      {"type":"input","subtask_id":10,"param_id":1,"default_value":"32"},
      {"type":"input","subtask_id":10,"param_id":2,"default_value":"200"},
      {"type":"input","subtask_id":10,"param_id":4,"default_value":"6:00:00"},
      {"type":"input","subtask_id":10,"param_id":11,"default_value":"minimap2"},
      {"type":"input","subtask_id":10,"param_id":12,"default_value":"nanocaller"},
      {"type":"input","subtask_id":10,"param_id":18},
      {"type":"output","subtask_id":10,"param_id":19},   
    ])
  }
}
