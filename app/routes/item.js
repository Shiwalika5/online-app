import Route from '@ember/routing/route';

import { products } from '../data/products';
import { inject as service } from '@ember/service';


export default class ItemRoute extends Route {
  @service store;
  
  async model(params) {
    const {
      item_id
    } = params;
    let data = await fetch(`https://dummyjson.com/products/${item_id}`).then((response) => response.json());
    return data;
  }
}



  //  const data =await fetch('https://fakestoreapi.com/products').then((response) => response.json());

  // async model(params) {
  //   const {
  //     item_id
  //   } = params;
  //    const data  = await this.store.findAll('product');
  //    const p =await fetch('https://fakestoreapi.com/products');
  //    console.log(p);
  //   // return products;
 
//}  
  // setupController(controller, model) {
  //   super.setupController(controller, model);
  //   controller.color = model.colors[0].color;
  // }
 
