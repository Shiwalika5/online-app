import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { action } from '@ember/object';
export default class FilterComponent extends Component {
  @tracked data = this.args.product;
  @tracked destination = "Filter...";
  @tracked next;
  @tracked prev;
  @tracked prev_button;

  constructor() {
    super(...arguments);

    this.next = 20;

  }

  categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
    "AllProducts"
  ]

  @action
  async handleFilter(categories) {
    
  
    this.destination = categories;
   
    this.args.filter({ queryParams: { category: categories }});

   if (categories == "AllProducts") {

   
      
    let response =await fetch(`https://dummyjson.com/products`).then((res) => res.json());
    this.data = response;
    return this.data;
    
  }
  else{
   
    this.next = 0;
    this.prev_button =0;
    let response =
    await fetch
      (`https://dummyjson.com/products/category/${categories}`)
      .then((res) => res.json());
  this.data = response;
  return this.data;
  }

  }

  // @action
  // async handleClick(value) {
  //   this.next = 0;
  //   this.prev_button =0;
  //   this.destination = value;
  //   if (value == "All Products") {
  //     let response =
  //       await fetch
  //         (`https://dummyjson.com/products`)
  //         .then((res) => res.json());
  //     this.data = response;
    

  //   }
  //   else {
  //     let response =
  //       await fetch
  //         (`https://dummyjson.com/products/category/${value}`)
  //         .then((res) => res.json());
  //     this.data = response;
  //   }

  // }
  @action
  async search(term) {
    this.next = 0;
    this.prev_button =0;
    let url = await fetch(
      `https://dummyjson.com/products/search?q=${term.target.value}`
    ).then((resp) => resp.json());
    console.log(this.data);
    return (this.data = url);

  }


  @task({ keepLatest: true })
  *paginationTask(skip_pages) {
    let page_number = (skip_pages/10); 

   
     console.log(skip_pages, 'skipped',page_number ,'page');
    this.args.filter({ queryParams: { page: page_number }});
    this.args.filter({ queryParams: { category: "AllProducts" }});

    if (skip_pages <this.data.total) {


      this.data = yield fetch(
        `https://dummyjson.com/products?limit=10&skip=${skip_pages}`
      ).then((response) => response.json());

      
      if (skip_pages >= 20) {
        this.prev = skip_pages - 10;
        this.prev_button = 1;
      }
      else if (skip_pages < 20) {
        this.prev_button = 0;
      }

      
        this.next = skip_pages + 10; 
       
      
        if(this.next == this.data.total){
          this.next = 0;
        }
    

      return this.data;

    }



  }

  // @task({ keepLatest: true })
  // *paginationTask(skip_pages) {

  //   if (skip_pages <this.data.total) {


  //     this.data = yield fetch(
  //       `https://dummyjson.com/products?limit=20&skip=${skip_pages}`
  //     ).then((response) => response.json());

      
  //     if (skip_pages >= 20) {
  //       this.prev = skip_pages - 20;
  //       this.prev_button = 1;
  //     }
  //     else if (skip_pages < 20) {
  //       this.prev_button = 0;
  //     }

      
  //       this.next = skip_pages + 20; 
      
  //       if(this.next == this.data.total){
  //         this.next = 0;
  //       }
    

  //     return this.data;

  //   }



  // }
}
