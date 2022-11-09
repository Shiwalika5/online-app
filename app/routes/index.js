import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    
    let p = await fetch('https://dummyjson.com/products?limit=20&skip=0').then((response) => response.json());
      this.store.pushPayload({products : p.products});

    return p;
  }


  

}
