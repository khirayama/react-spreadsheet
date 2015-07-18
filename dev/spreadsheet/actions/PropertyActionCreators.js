import AppDispatcher from '../../framework/AppDispatcher';

let PropertyActionCreators = {
  create: (name, amount) => {
    AppDispatcher.dispatch('PROPERTY_CREATE', {
      name: name,
      amount: amount
    });
  },
  update: (id, name, amount) => {
    AppDispatcher.dispatch('PROPERTY_UPDATE', {
      id: id,
      name: name,
      amount: amount
    });
  },
  destroy: (id) => {
    AppDispatcher.dispatch('PROPERTY_DESTROY', {
      id: id
    });
  }
};
export default PropertyActionCreators;
