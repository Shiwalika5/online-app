import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class IndexController extends Controller {

  @service router;
     
  queryParams = ['category','page'];
  @tracked category= 'AllProduct'
  @tracked page = 1;


  constructor() {
    super(...arguments);

   

  }


  @action
  async handleClick(queryParams) {
    
    this.router.transitionTo('index', queryParams);
  }

 }
