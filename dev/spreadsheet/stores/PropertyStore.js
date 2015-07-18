import 'babel/polyfill';
import Store from '../../framework/Store';

class PropertyStore extends Store {
  constructor() {
    super();
    this.register({
      'PROPERTY_CREATE': (action) => {
        if (action.name && action.amount) this._create(action.name, action.amount);
      },
      'PROPERTY_UPDATE': (action) => {
        if (action.name && action.amount) this._update(action.id, {name: action.name, amount: action.amount});
      },
      'PROPERTY_DESTROY': (action) => {
        this._destroy(action.id);
      }
    });
    this._properties = this._load() || {};
  }
  _create(name, amount) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this._properties[id] = {
      id: id,
      name: name,
      amount: amount
    };
    this._save();
  }
  _update(id, updates) {
    this._properties[id] = Object.assign({}, this._properties[id], updates);
    this._save();
  }
  _destroy(id) {
    delete this._properties[id];
    this._save();
  }
  getById(id) {
    return this._properties[id];
  }
  getAll() {
    let properties = [];
    for (let id in this._properties) {
      if (!{}.hasOwnProperty.call(this._properties, id)) return false;
      properties.push(this._properties[id]);
    }
    return properties;
  }
  _save() {
    localStorage.setItem('_properties', JSON.stringify(this._properties));
  }
  _load() {
    return JSON.parse(localStorage.getItem('_properties'));
  }
}
export default new PropertyStore();
