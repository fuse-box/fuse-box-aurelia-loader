import { inject } from 'aurelia-framework';
import { GridConnector } from 'aurelia-v-grid';
import { DataSource } from 'aurelia-v-grid';
import { Selection } from 'aurelia-v-grid';
import { DummyDataGenerator } from '../misc/dummyDataGenerator';

@inject(DummyDataGenerator)
export class Welcome {
  public heading = 'Welcome to the Fuse-Box-Aurelia-Loader Sample!';
  public ds: DataSource;
  public dummydata:any;
  public gridConnector: GridConnector;

  constructor(public dummyDataGenerator: DummyDataGenerator) {

    //generate some temp data for the grid
    this.dummyDataGenerator.generateData(10000, (data: any) => {
      this.dummydata = data;
    });

    //create a datasource for the grid
    this.ds = new DataSource(new Selection('multiple'));

    //create a connector for the grid
    this.gridConnector = new GridConnector(this.ds);

    //add data to the datasource
    this.ds.setArray(this.dummydata);
  }

}


