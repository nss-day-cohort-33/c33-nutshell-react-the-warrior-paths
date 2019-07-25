const remoteURL = "http://localhost:5002";
//The Object.create() method creates a new object, using an existing object as the prototype of the newly created object.

export default Object.create(null, {
  get: {
    value: function(resource, id) {
      return fetch(`${remoteURL}/${resource}/${id}`).then(e => e.json());
    }
  },

  getAll: {
    value: function(resource) {
      return fetch(`${remoteURL}/${resource}`).then(e => e.json());
    }
  },

  delete: {
    value: function(resource, id) {
      return fetch(`${remoteURL}/${resource}/${id}`, {
        method: "DELETE"
      }).then(e => e.json());
    }
  },

  post: {
    value: function(resource, newObject) {
      return fetch(`${remoteURL}/${resource}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newObject)
      }).then(data => data.json());
    }
  },

  removeAndList: {
    value: function(resource, id) {
      return fetch(`${remoteURL}/${resource}/${id}`, {
        method: "DELETE"
      })
        .then(e => e.json())
        .then(() => fetch(`${remoteURL}/${resource}`))
        .then(e => e.json());
    }
  },

  put: {
    value: function(resource, editedAnimal, id) {
      return fetch(`${remoteURL}/${resource}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedAnimal)
      }).then(data => data.json());
    }
  }
});
