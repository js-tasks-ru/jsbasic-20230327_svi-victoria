export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(productToAdd) {
    let cartItem;
    if (!productToAdd) {
      return;
    } else {
      cartItem = { product: productToAdd, count: 1 };
      if (this.cartItems.length == 0) {
        this.cartItems.push(cartItem);
      } else {
        let filtratedItem = this.cartItems.filter(
          (item) => item.product == productToAdd
        );
        if (filtratedItem.length == 0) {
          this.cartItems.push(cartItem);
        } else {
          let indexOfProduct = this.cartItems.findIndex(
            (item) => item.product == filtratedItem[0].product
          );
          this.cartItems[indexOfProduct].count += 1;
        }
      }
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let filtratedOnId = this.cartItems.filter(
      (item) => item.product.id == productId
    );
    let indexOfProduct = this.cartItems.findIndex(
      (item) => item.product == filtratedOnId[0].product
    );
    this.cartItems[indexOfProduct].count += amount;
    if (this.cartItems[indexOfProduct].count == 0) {
      delete this.cartItems[indexOfProduct];
    }
    let emptyCart = this.getTotalCount();
    if (emptyCart === 0) {
      this.cartItems.length = 0;
    }
    this.onProductUpdate(this.cartItems[indexOfProduct]);
  }

  isEmpty() {
    let checkEmpty = this.cartItems.length == 0 ? true : false;
    return checkEmpty;
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce(function (total, item) {
      return total + item.count;
    }, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = this.cartItems.reduce(function (total, item) {
      return total + item.product.price * item.count;
    }, 0);
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
