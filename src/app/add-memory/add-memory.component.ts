import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.component.html',
  styleUrls: ['./add-memory.component.css']
})
export class AddMemoryComponent implements OnInit {
  memory: any = {};

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {

  }
  onSubmit() {
    this.memory.date = new Date(this.memory.date).valueOf();
    this.db.list('memories').push(this.memory)
      .then(_ => {
        this.memory = {};
        console.log('success');
      });
  }
}
