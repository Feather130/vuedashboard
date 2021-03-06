import { get, post, put, NAMESPACE } from "./basic";

let path = "/inventory/managedObjects";
let config = {
  headers: {
    "Content-Type": `${NAMESPACE}managedObject+json`,
    Accept: `${NAMESPACE}managedObject+json`
  }
};

function buildDetailUrl(mo) {
  let id = mo && (mo.id || mo);
  return id && `${path}/${id}`;
}

function list(filters = {}) {
  let url = path;
  let params = filters;
  return get(url, params);
}

function create(mo) {
  let url = path;
  return post(url, mo, config);
}

function update(mo) {
  let url = buildDetailUrl(mo);
  return put(url, mo, config);
}

let inventory = {
  list,
  create,
  update
};

export default inventory;
