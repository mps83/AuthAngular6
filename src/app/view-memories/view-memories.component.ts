import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewMemoriesDataSource, ViewMemoriesItem } from './view-memories-datasource';
import { AngularFireDatabase } from 'angularfire2/database';
import { pipe, Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-view-memories',
  templateUrl: './view-memories.component.html',
  styleUrls: ['./view-memories.component.css'],
})
export class ViewMemoriesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewMemoriesDataSource;

  displayedColumns = ['date', 'text'];
  subscription: Subscription;
  constructor(private db: AngularFireDatabase) {  }

  ngOnInit() {
    this.subscription = this.db.list<ViewMemoriesItem>('memories').valueChanges().pipe(first()).subscribe( d => {
      console.log('data streaming');
      this.dataSource = new ViewMemoriesDataSource(this.paginator, this.sort);
      console.log(d);
      this.dataSource.data = d;
      console.log(this.dataSource.data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
