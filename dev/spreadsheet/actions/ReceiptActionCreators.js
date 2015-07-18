import AppDispatcher from '../../framework/AppDispatcher';
import PropertyStore from '../stores/PropertyStore';
// FIXME: ここでは使用していないが、他にまだ呼び出していないため記述
import ReceiptStore from '../stores/ReceiptStore';

// FIXME: 支出、収入、振替を総じたいいAction名。もっと分けるべきか
let ReceiptActionCreators = {
  create: (receipt) => {
    let property = PropertyStore.getById(receipt.property);
    // TODO: receiptなので、資産を増やしてcreate
    AppDispatcher.dispatch('RECEIPT_CREATE', {
      amount: receipt.amount,
      date: receipt.date,
      category: receipt.category,
      memo: receipt.memo
    });
    AppDispatcher.dispatch('PROPERTY_UPDATE', {
      id: receipt.property,
      name: property.name,
      amount: +property.amount + +receipt.amount
    });
  }
};
export default ReceiptActionCreators;


