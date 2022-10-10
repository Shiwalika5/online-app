import Model from '@ember-data/model';

export default class CartModel extends Model {
    @attr title;
    @attr thumbnail;
    @attr price;
}
