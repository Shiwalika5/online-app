import Model, { attr } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr category;
  @attr description;
  @attr title;
  @attr thumbnail;
  @attr price;
 
}
