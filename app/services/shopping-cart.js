import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

class Item {
  @tracked count;

  title;
  thumbnail;
  price;

  constructor(item) {
    this.count = item.count;
    this.title = item.title;
    // this.color = item.color;
    this.thumbnail = item.thumbnail;
    this.price = item.price;
  }
}
export default class ShoppingCartService extends Service {
  @tracked itemList = [];

  addItem(item) {
    const existingItem = this.itemList.find(({ title}) => {
      return title === item.title ;
    });

    if (existingItem) {
      existingItem.count += 1;
    } else {
      this.itemList = [...this.itemList, new Item({
        ...item,
        count: 1,
      })];
    }

  }
}
