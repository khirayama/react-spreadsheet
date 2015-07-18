import AppDispatcher from '../../framework/AppDispatcher';
import PropertyStore from '../stores/PropertyStore';
// FIXME: ここでは使用していないが、他にまだ呼び出していないため記述
import TransferStore from '../stores/TransferStore';

let TransferActionCreators = {
  create: (transfer) => {
    let fromProperty = PropertyStore.getById(transfer.from);
    let toProperty = PropertyStore.getById(transfer.to);

    AppDispatcher.dispatch('TRANSFER_CREATE', {
      amount: transfer.amount,
      from: transfer.from,
      to: transfer.to,
      date: transfer.date,
      memo: transfer.memo
    });
    AppDispatcher.dispatch('PROPERTY_UPDATE', {
      id: transfer.from,
      name: fromProperty.name,
      amount: +fromProperty.amount - +transfer.amount
    });
    AppDispatcher.dispatch('PROPERTY_UPDATE', {
      id: transfer.to,
      name: toProperty.name,
      amount: +toProperty.amount + +transfer.amount
    });
  }
};
export default TransferActionCreators;


