import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { products } from '../../data/products';

export default class ProductDetailsComponent extends Component {

  @service('shopping-cart') cart;
  @service store;

  @action
  addToCart() {
    const { title, price, thumbnail } = this.store.peekRecord('product', this.args.product.id);
 
    this.cart.addItem({
      title,
      price,
      thumbnail
    });
  }
}
